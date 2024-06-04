@extends('components.elements.app')

@section('title', 'Sim Admin - Guru')

@push('style')
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="{{ asset('library/datatables/media/css/dataTables.min.css') }}">
    <link rel="stylesheet" href=" {{ asset('library/select2/dist/css/select2.min.css') }}">
@endpush

@section('main')
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Guru</h1>
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
                        <div class="w-100">
                            <div class="d-flex justify-content-between flex-wrap">
                                <div class="d-flex align-items-center flex-wrap">
                                    <button type="button" class="btn btn-icon icon-left btn-primary mr-2 mb-2"
                                        data-toggle="modal" data-target="#modal-create"><i class="fas fa-plus"></i>
                                        Tambah</button>
                                    <button type="button" class="btn btn-icon icon-left btn-primary mr-2 mb-2"
                                        data-toggle="modal" data-target="#modal-import"><i class="fas fa-upload"></i>
                                        Import</button>
                                    <form action="" method="get">
                                        @csrf
                                        @method('GET')
                                        <button type="submit" class="btn btn-icon icon-left btn-primary mr-2 mb-2"><i
                                                class="fas fa-download"></i>
                                            Export</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div>
                            <table class="table table-striped table-bordered" id="datatable">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 80px;">#</th>
                                        <th style="min-width: 240px;">Nomor ID / Nama</th>
                                        <th style="min-width: 160px;">Username</th>
                                        <th style="min-width: 160px;">Status</th>
                                        <th style="min-width: 160px;">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($teachers as $index => $teacher)
                                        <tr>
                                            <td class="text-center">{{ $index + 1 }}</td>
                                            <td>
                                                <div class="media">
                                                    @if ($teacher->image)
                                                        <img src="{{ asset('storage/upload/teacher/' . $teacher->image) }}"
                                                            id="image" width="48" class="mr-3 rounded-circle">
                                                    @else
                                                        <img alt="image" class="mr-3 rounded-circle" width="48"
                                                            src="{{ asset('img/avatar/avatar-1.png') }}">
                                                    @endif
                                                    <div class="media-body">
                                                        <div class="media-title">
                                                            {{ $teacher->id_number }}</div>
                                                        <div class="text-job text-muted">
                                                            {{ $teacher->name }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{{ $teacher->user->username }}</td>
                                            <td>
                                                <div
                                                    class="badge {{ $teacher->user->status === 'active' ? 'badge-success' : ($teacher->user->status === 'inactive' ? 'badge-danger' : 'badge-warning') }}">
                                                    {{ $teacher->user->status === 'active' ? 'Aktif' : ($teacher->user->status === 'inactive' ? 'Tidak Aktif' : '-') }}
                                                </div>
                                            </td>
                                            <td>
                                                <div class="d-flex items-center">
                                                <button type="button" class="btn btn-icon btn-primary mr-2 mb-2"
                                                    data-toggle="modal" data-target="#modal-edit"
                                                    onclick="
                                                    $('#modal-edit #form-edit').attr('action', '{{route('admin.teacher.update', $teacher->id)}}');
                                                    $('#modal-edit #form-edit #id_number').attr('value', '{{ $teacher->id_number }}');
                                                    $('#modal-edit #form-edit #name').attr('value', '{{ $teacher->name }}');
                                                    $('#modal-edit #form-edit #status').val('{{ $teacher->user->status }}');
                                                    $('#modal-edit #form-edit #role').val('{{ $teacher->role }}');
                                                    $('#modal-edit #form-edit #username').attr('value', '{{ $teacher->user->username }}');
                                                    @if ($teacher->image)
                                                        $('#modal-edit #form-edit #teacher-image').attr('src', '{{ asset('storage/upload/teacher/' . $teacher->image) }}');
                                                    @endif
                                                    "><i class="fas fa-edit"></i></button>
                                                            <button type="button" class="btn btn-icon btn-danger mr-2 mb-2"
                                                        data-toggle="modal" data-target="#modal-delete"
                                                        onclick="$('#modal-delete #form-delete').attr('action', 'teacher/{{ $teacher->id }}/delete')"><i
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
                    <h5 class="modal-title">Tambah Guru</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate="" method="POST" action="{{ route('admin.teacher.create') }}"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="form-group mb-2">
                            <label for="id_number">Nomor ID<span class="text-danger">*</span></label>
                            <input type="text" id="id_number" class="form-control" name="id_number" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="name">Nama<span class="text-danger">*</span></label>
                            <input type="text" id="name" class="form-control" name="name" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="email">Email<span class="text-danger">*</span></label>
                            <input type="text" id="email" class="form-control" name="email" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="status">Status<span class="text-danger">*</span></label>
                            <select class="form-control" name="status" required>
                                <option value="active" selected>Active</option>
                                <option value="inactive">In Active</option>
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label for="username">Username<span class="text-danger">*</span></label>
                            <input type="text" id="username" class="form-control" name="username" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="password">Password<span class="text-danger">*</span></label>
                            <input type="password" id="password" class="form-control" name="password" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="image">Gambar</label>
                            <input type="file" id="image" class="form-control" name="image">
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
                    <h5 class="modal-title">Import Guru</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate="" method="POST" action=""
                        enctype="multipart/form-data">
                        @csrf
                        <div class="form-group mb-2">
                            <label for="teachers">File </label>
                            <input type="file" id="teachers" class="form-control" name="teachers" required>
                        </div>
                        <div>
                            <a href="" class="btn btn-icon icon-left btn-info mr-2 mb-2"><i
                                    class="fas fa-download"></i>
                                Unduh Template</a>
                            {{-- <a href="#" class="btn btn-icon icon-left btn-info mr-2 mb-2"><i
                                    class="fas fa-circle-info"></i>
                                Unduh Instruksi Template</a> --}}
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
                    <h5 class="modal-title">Ubah Guru</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-edit" class="needs-validation" novalidate="" method="POST" action=""
                        enctype="multipart/form-data">
                        @method('PUT')
                        @csrf
                        <div class="form-group mb-2">
                            <label for="id_number">Nomor ID<span class="text-danger">*</span></label>
                            <input type="text" id="id_number" class="form-control" name="id_number" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="name">Nama<span class="text-danger">*</span></label>
                            <input type="text" id="name" class="form-control" name="name" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="status">Status<span class="text-danger">*</span></label>
                            <select class="form-control" name="status" id="status" required>
                                <option value="active">Active</option>
                                <option value="inactive">In Active</option>
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label for="username">Username<span class="text-danger">*</span></label>
                            <input type="text" id="username" class="form-control" name="username" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" name="password">
                        </div>
                        <div class="form-group mb-2">
                            <label for="image">Gambar</label>
                            <input type="file" id="image" class="form-control" name="image">
                        </div>
                        <img id="teacher-image" width="60" class="mt-2">
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
                    <h5 class="modal-title">Hapus Guru</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-delete" class="needs-validation" novalidate="" method="POST" action=""
                        enctype="multipart/form-data">
                        @csrf
                        @method('delete')
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
@endpush
