@extends('components.elements.app')

@section('title', 'Simaku Admin - Tracking Location')

@push('style')
    <style>
        #map {
            height: 400px;
            width: 100%;
        }
    </style>
@endpush

@section('main')
    <div class="container">
        <h1 class="title">Local Geolocation Tracking</h1>
        <div id="map"></div>
        <p>Latitude: <span id="latitude"></span></p>
        <p>Longitude: <span id="longitude"></span></p>
    </div>
@endsection

@push('scripts')
    <script>
        function initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            document.getElementById('latitude').textContent = latitude;
            document.getElementById('longitude').textContent = longitude;

            var mapProp = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 15,
            };
            var map = new google.maps.Map(document.getElementById("map"), mapProp);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                map: map,
            });
        }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=&v=weekly"></script>
@endpush
