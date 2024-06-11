@extends('components.elements.app')

@section('title', 'Simaku Admin - Setting')

@push('style')
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="{{ asset('library/select2/dist/css/select2.min.css') }}">
@endpush

@section('main')
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Setting</h1>
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
                        <h4>Informasi Sekolah</h4>
                    </div>
                    <div class="card-body">
                        @if ($setting)
                            <form id="form-edit" class="needs-validation" method="POST"
                                action="{{ route('admin.setting.update', $setting->id) }}" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                        @else
                            <form id="form-create" class="needs-validation" method="POST"
                                action="{{ route('admin.setting.create') }}" enctype="multipart/form-data">
                                @csrf
                        @endif
                            <div class="form-group row mb-2 mb-md-3">
                                <label class="col-sm-4 col-form-label">Tahun Pelajaran<span
                                        class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <select class="form-control select2" name="school_year" required>
                                        @if ($setting)
                                            <option value="{{ $setting->school_year }}" id="school_year">
                                                {{ $setting->school_year }}</option>
                                            @foreach ($school_years as $school_year)
                                                <option value="{{ $school_year }}">{{ $school_year }}</option>
                                            @endforeach
                                        @else
                                            @foreach ($school_years as $school_year)
                                                <option value="{{ $school_year }}">{{ $school_year }}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row mb-2 mb-md-3">
                                <label class="col-sm-4 col-form-label">Nama Sekolah<span
                                        class="text-danger">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" name="name" required
                                        value="{{ $setting != null ? $setting->name : '' }}">
                                </div>
                            </div>
                            <div class="mt-5 d-flex justify-content-end">
                                <button type="submit" class="btn btn-primary ml-2">{{ $setting ? 'Update' : 'Submit' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@push('scripts')
    <!-- JS Libraries -->
    <script src="{{ asset('library/select2/dist/js/select2.full.min.js') }}"></script>
@endpush
