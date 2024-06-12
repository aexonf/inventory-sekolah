@extends('components.elements.app')

@section('title', 'Simaku Admin - QR Scan')

@push('style')
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="{{ asset('library/datatables/media/css/dataTables.min.css') }}">
    <link rel="stylesheet" href="{{ asset('library/select2/dist/css/select2.min.css') }}">

    <style>
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            padding: 20px;
            box-sizing: border-box;
        }

        .video-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin-bottom: 20px;
        }

        .video-container video {
            width: 100%;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .results {
            text-align: center;
            margin-top: 20px;
        }

        .results span {
            display: block;
            margin-top: 10px;
            font-weight: bold;
        }

        .container .title {
            margin-top: 50px;
        }
    </style>
@endpush

@section('main')
    <div class="container">
        <h1 class="title">Scan from WebCam:</h1>
        <div class="video-container" id="video-container">
            <video id="qr-video" autoplay></video>
        </div>
        <div class="results">
            <b>Detected QR code: </b>
            <span id="cam-qr-result">None</span>
            <b>Last detected at: </b>
            <span id="cam-qr-result-timestamp"></span>
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

    <script src="{{ asset('js/qr-scanner.umd.min.js') }}"></script>
    <script src="{{ asset('js/qr-scanner.legacy.min.js') }}"></script>
    <script src="{{ asset('js/qr-scanner-worker.min.js') }}"></script>
    <script>
        const QrScanner = window.QrScanner;

        const video = document.getElementById('qr-video');
        const camQrResult = document.getElementById('cam-qr-result');
        const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');

        function setResult(label, result) {
            console.log(result.data);
            label.textContent = result.data;
            camQrResultTimestamp.textContent = new Date().toString();
            label.style.color = 'teal';
            clearTimeout(label.highlightTimeout);
            label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
        }

        const scanner = new QrScanner(video, result => setResult(camQrResult, result), {
            onDecodeError: error => {
                camQrResult.textContent = error;
                camQrResult.style.color = 'inherit';
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
        });

        scanner.start();
    </script>
@endpush
