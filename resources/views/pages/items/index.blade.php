@extends('components.elements.app')

@section('title', 'Simaku Admin - Item')

@push('style')
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="{{ asset('library/datatables/media/css/dataTables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('library/select2/dist/css/select2.min.css') }}">
@endpush

@section('main')
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Item</h1>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div>
                            <table class="table table-striped table-bordered" id="datatable">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="min-width: 40px;">#</th>
                                        <th style="min-width: 240px;">Nomor ID / Nama</th>
                                        <th style="min-width: 160px;">Description</th>
                                        <th style="min-width: 160px;">Stock</th>
                                        <th style="min-width: 160px;">Status</th>
                                        <th style="min-width: 160px;">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($items as $index => $item)
                                        <tr>
                                            <td class="text-center">{{ $index + 1 }}</td>
                                            <td>
                                                <div class="media">
                                                    <img alt="image" class="mr-3 rounded-circle" width="48"
                                                        src="{{ asset('storage/upload/items/'. $item->image) }}">
                                                    <div class="media-body">
                                                        <div class="media-title">
                                                            {{ $item->id_number }}</div>
                                                        <div class="text-job text-muted">
                                                            {{ $item->name }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{{ $item->description }}</td>
                                            <td>{{ $item->stock }}</td>
                                            <td>{{ $item->status }}</td>
                                            <td>
                                                <div class="d-flex items-center">
                                                    <button type="button" class="btn btn-icon btn-primary mr-2 mb-2"
                                                        data-toggle="modal" data-target="#modal-edit"
                                                        onclick="
                                                        $('#modal-edit #form-edit').attr('action', '{{ route('admin.item.update', $item->id) }}');
                                                        $('#modal-edit #form-edit #id_number').attr('value', '{{ $item->id_number }}');
                                                        $('#modal-edit #form-edit #name').attr('value', '{{ $item->name }}');
                                                        $('#modal-edit #form-edit #description').attr('value', '{{ $item->description }}');
                                                        $('#modal-edit #form-edit #stock').attr('value', '{{ $item->stock }}');
                                                        $('#modal-edit #form-edit #category').attr('value', '{{ $item->categories_id }}');
                                                        @if ($item->image) $('#modal-edit #form-edit #image').attr('src', '{{ asset('storage/upload/items/' . $item->image) }}'); @endif
                                                        "><i
                                                            class="fas fa-edit"></i></button>
                                                    <button type="button" class="btn btn-icon btn-danger mr-2 mb-2"
                                                        data-toggle="modal" data-target="#modal-delete"
                                                        onclick="$('#modal-delete #form-delete').attr('action', '{{ route('admin.item.delete', $item->id) }}')"><i
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
                    <h5 class="modal-title">Tambah Item</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate="" method="POST" action="{{ route('admin.item.create') }}"
                        enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <div class="form-group mb-2">
                            <label for="id_number">Id Number<span class="text-danger">*</span></label>
                            <input type="text" id="id_number" class="form-control" name="id_number" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="name">Nama<span class="text-danger">*</span></label>
                            <input type="text" id="name" class="form-control" name="name" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="description">Description<span class="text-danger">*</span></label>
                            <input type="text" id="description" class="form-control" name="description" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="stock">Stock<span class="text-danger">*</span></label>
                            <input type="text" id="stock" class="form-control" name="stock" required>
                        </div>

                        <div class="form-group mb-2">
                            <label>Category<span class="text-danger">*</span></label>
                            <select class="form-control" name="category" required>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
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
                    <h5 class="modal-title">Import Item</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" novalidate="" method="POST" action="#"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="form-group mb-2">
                            <label for="students">File </label>
                            <input type="file" id="students" class="form-control" name="students" required>
                        </div>
                        <div>
                            <a href="#" class="btn btn-icon icon-left btn-info mr-2 mb-2"><i
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
                    <h5 class="modal-title">Ubah Item</h5>
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
                            <label for="id_number">Id Number<span class="text-danger">*</span></label>
                            <input type="text" id="id_number" class="form-control" name="id_number" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="name">Nama<span class="text-danger">*</span></label>
                            <input type="text" id="name" class="form-control" name="name" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="description">Description<span class="text-danger">*</span></label>
                            <input type="text" id="description" class="form-control" name="description" required>
                        </div>
                        <div class="form-group mb-2">
                            <label for="stock">Stock<span class="text-danger">*</span></label>
                            <input type="text" id="stock" class="form-control" name="stock" required>
                        </div>
                        <div class="form-group mb-2">
                            <label>Category<span class="text-danger">*</span></label>
                            <select class="form-control" name="category" required>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->name }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
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
                    <h5 class="modal-title">Hapus Item</h5>
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
@endpush
