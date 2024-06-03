@extends('components.elements.app')

@section('title', 'Simaku Admin - Siswa Aktif')

@push('style')
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="{{ asset('library/datatables/media/css/dataTables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('library/select2/dist/css/select2.min.css') }}">
@endpush

@section('main')
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Siswa Aktif</h1>
            </div>

            @if (session('success') || session('error'))
                <div
                    class="alert {{ session('success') ? 'alert-success' : '' }} {{ session('error') ? 'alert-danger' : '' }} alert-dismissible show fade">
                    <div class="alert-body">
                        <button class="close" data-dismiss="alert">
                            <span>×</span>
                        </button>
                        {{ session('success') }}
                        {{ session('error') }}
                    </div>
                </div>
            @endif

            <div class="section-body">
                <div class="card">
                    <div class="card-header">
                        <div class="w-100 d-flex justify-content-between flex-wrap">
                            <div class="d-flex align-items-center flex-wrap">
                                <button type="button" class="btn btn-icon icon-left btn-primary mr-2 mb-2"
                                    data-toggle="modal" data-target="#modal-create"><i class="fas fa-plus"></i>
                                    Tambah</button>
                                <button type="button" class="btn btn-icon icon-left btn-primary mr-2 mb-2"
                                    data-toggle="modal" data-target="#modal-import"><i class="fas fa-upload"></i>
                                    Import</button>
                                    <form action="{{route("active-student.export.pdf")}}" method="get">
                                        @csrf
                                        @method("GET")
                                        <button type="submit" class="btn btn-icon icon-left btn-primary mr-2 mb-2"
                                        ><i class="fas fa-download"></i>
                                        Export</button>
                                    </form>
                            </div>
                            <div class="d-flex align-items-center flex-wrap">
                                <button type="button" class="btn btn-icon icon-left btn-info mr-2 mb-2"
                                    data-toggle="collapse" data-target="#section-filter"><i class="fas fa-filter"></i>
                                    Filter</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="collapse mb-3 pb-3 border-bottom show" id="section-filter">
                            <form class="needs-validation" novalidate="" method="GET"
                                action="{{ route('active-student.view') }}" enctype="multipart/form-data">
                                <div class="row">
                                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div class="form-group mb-2">
                                            <label class="mb-2">Tahun Pelajaran</label>
                                            <select class="form-control select2" name="school_year" required
                                                onchange="handleChangeFilter(this)">
                                                @foreach ($school_years as $school_year)
                                                @php
                                                    $selected = ($request->school_year === $school_year || (!is_null($setting) && $setting->school_years === $school_year)) ? 'selected' : '';
                                                    if (is_null($request->school_year) && (is_null($setting) || is_null($setting->school_years))) {
                                                        $selected = (date('Y') === $school_year) ? 'selected' : '';
                                                    }
                                                @endphp
                                                <option value="{{ $school_year }}" {{ $selected }}>{{ $school_year }}</option>
                                            @endforeach

                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div class="form-group mb-2">
                                            <label class="mb-2">Tingkat</label>
                                            <select class="form-control select2" id="generationSelect" name="generation"
                                                required onchange="handleChangeFilter(this)">
                                                @foreach ($generations as $generation)
                                                    @if ($request->generation === $generation)
                                                        <option value="{{ $generation }}" selected>
                                                            {{ $generation }}</option>
                                                    @else
                                                        <option value="{{ $generation }}">{{ $generation }}</option>
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div class="form-group mb-2">
                                            <label class="mb-2">Kelas</label>
                                            <select class="form-control select2" id="classSelect" name="class" required
                                                onchange="handleChangeFilter(this)">
                                                @foreach ($classes as $class)
                                                    @foreach ($class as $item)
                                                        @if ($request->class === $item)
                                                            <option value="{{ $item }}" selected>
                                                                {{ $item }}
                                                            </option>
                                                        @else
                                                            <option value="{{ $item }}">{{ $item }}
                                                            </option>
                                                        @endif
                                                    @endforeach
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    {{-- <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div class="form-group mb-2">
                                            <label class="mb-2">Point</label>
                                            <select class="form-control select2" name="point" required
                                                onchange="handleChangeFilter(this)">
                                                <option value="terbanyak" selected>Terbanyak</option>
                                                <option value="sedikit">Sedikit</option>
                                            </select>
                                        </div>
                                    </div> --}}
                                </div>
                                <div class="d-flex justify-content-end">
                                    <a href="{{ route('active-student.view') }}" class="btn btn-danger ml-2">Reset</a>
                                    <button type="submit" class="btn btn-primary ml-2">Kirim</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <table class="table table-striped table-bordered" id="datatable">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 80px;">#</th>
                                        <th style="min-width: 240px;">Nomor ID / Nama</th>
                                        <th style="min-width: 160px;">Tingkat</th>
                                        <th style="min-width: 160px;">Kelas</th>
                                        <th style="min-width: 160px;">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($active_students as $index => $active_student)
                                        <tr>
                                            <td class="text-center">{{ $index + 1 }}</td>
                                            <td>
                                                <div class="media">
                                                    <img alt="image" class="mr-3 rounded-circle" width="48"
                                                        src="{{ asset('img/avatar/avatar-1.png') }}">
                                                    <div class="media-body">
                                                        <div class="media-title">
                                                            {{ $active_student->student->id_number }}</div>
                                                        <div class="text-job text-muted">
                                                            {{ $active_student->student->name }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{{ $active_student->generation }}</td>
                                            <td>{{ $active_student->class }}</td>
                                            <td>
                                                <div class="d-flex items-center">
                                                    <button type="button" class="btn btn-icon btn-primary mr-2 mb-2"
                                                        data-toggle="modal" data-target="#modal-edit"
                                                        onclick="
                                                        $('#modal-edit #form-edit').attr('action', 'active-student/{{ $active_student->id }}/update');
                                                        $('#school_year').attr('value', '{{ $active_student->school_year }}');
                                                        $('#modal-edit #form-edit #generation').attr('value', '{{ $active_student->generation }}');
                                                        $('#modal-edit #form-edit #class').attr('value', '{{ $active_student->class }}');
                                                        $('#modal-edit #form-edit #school_year').val('{{ $active_student->school_year }}');
                                                        $('#modal-edit #form-edit #id_number').attr('value', '{{ $active_student->student->id_number }}');
                                                        "><i
                                                            class="fas fa-edit"></i></button>
                                                    <button type="button" class="btn btn-icon btn-danger mr-2 mb-2"
                                                        data-toggle="modal" data-target="#modal-delete"
                                                        onclick="$('#modal-delete #form-delete').attr('action', 'active-student/{{ $active_student->id }}/delete')"><i
                                                            class="fas fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


    {{-- modal create --}}
    <div class="modal fade" id="modal-create" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tambah Siswa Aktif</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate="" method="POST"
                        action="{{ route('active-student.create') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group mb-2">
                            <label>Tahun Pelajaran<span class="text-danger">*</span></label>
                            <select class="form-control" id="school_year" name="school_year" >
                                @foreach ($school_years as $school_year)
                                @php
                                    $selected = ($request->school_year === $school_year || (!is_null($setting) && $setting->school_years === $school_year)) ? 'selected' : '';
                                    if (is_null($request->school_year) && (is_null($setting) || is_null($setting->school_years))) {
                                        $selected = (date('Y') === $school_year) ? 'selected' : '';
                                    }
                                @endphp
                                <option value="{{ $school_year }}" {{ $selected }}>{{ $school_year }}</option>
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label>Tingkat<span class="text-danger">*</span></label>
                            <select class="form-control" name="generation" required>
                                @foreach ($generations as $generation)
                                    <option value="{{ $generation }}">{{ $generation }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label>Kelas<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="class" required>
                        </div>
                        <div class="form-group mb-2">
                            <label>NIS<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="id_number" required>
                        </div>
                        <div class="mt-5 d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Kembali</button>
                            <button type="submit" class="btn btn-primary ml-2">Kirim</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{-- modal import --}}
    <div class="modal fade" id="modal-import" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Import Siswa Aktif</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate="" method="POST"
                        action="{{ route('active-student.import') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group mb-2">
                            <label>File </label>
                            <input type="file" class="form-control" name="active_students" required>
                        </div>
                        <div>
                            <a href="{{ route('active-student.export') }}"
                                class="btn btn-icon icon-left btn-info mr-2 mb-2"><i class="fas fa-download"></i>
                                Unduh Template</a>
                        </div>
                        <div class="mt-5 d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Kembali</button>
                            <button type="submit" class="btn btn-primary ml-2">Kirim</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{-- modal edit --}}
    <div class="modal fade" id="modal-edit" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ubah Siswa Aktif</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-edit" class="needs-validation" novalidate="" method="POST" action=""
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="form-group mb-2">
                            <label>Tahun Pelajaran<span class="text-danger">*</span></label>
                            <select class="form-control" name="school_year" id="school_year" required>
                                @foreach ($school_years as $school_year)
                                    <option value="{{ $school_year }}">{{ $school_year }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label>Tingkat<span class="text-danger">*</span></label>
                            <select class="form-control" name="generation" id="generation" required>
                                @foreach ($generations as $generation)
                                    <option value="{{ $generation }}">{{ $generation }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label>Kelas<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="class" id="class" required>
                        </div>
                        <div class="form-group mb-2">
                            <label>Nis<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="id_number" id="id_number" required>
                        </div>
                        <div class="mt-5 d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Kembali</button>
                            <button type="submit" class="btn btn-primary ml-2">Kirim</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{-- modal delete --}}
    <div class="modal fade" id="modal-delete" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Hapus Siswa Aktif</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-delete" class="needs-validation" novalidate="" method="POST" action=""
                        enctype="multipart/form-data">
                        @csrf
                        @method('DELETE')
                        <div class="mt-5 d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary ml-2" data-dismiss="modal">Kembali</button>
                            <button type="submit" class="btn btn-danger ml-2">Kirim</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <!-- JS Libraries -->
    <script src="{{ asset('library/datatables/media/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('library/datatables/media/js/dataTables.min.js') }}"></script>
    <script src="{{ asset('library/jquery-ui-dist/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('js/page/modules-datatables.js') }}"></script>
    <script src="{{ asset('library/select2/dist/js/select2.full.min.js') }}"></script>
    <script>
        const handleChangeFilter = (e) => {
            const currentURL = new URL(window.location.href);
            currentURL.searchParams.set(e.name, e.value);
            window.history.pushState({}, '', currentURL);
            location.reload();
        }
    </script>
@endpush
