/* global google */

define(['jquery', 'framework-core', 'deferred!./map'],  function ($, Core) {
    'use strict';
    
    return Core.View.extend({
        defaults: {
            region: 'us',
            language: 'en'
        },
        
        id: 'mapView',
        
        className: 'maps',
          
        initialize: function () {
            this.geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(38.9666487, -94.7806608);
            this.mapOptions = {
                zoom: 15,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            this.markers = [];
            
            // code from Kris
            var me = this;
            $(document).on('click', '#mainView header button.btn_pretrieve-header', function () {
                setTimeout(function () {
                    me.clearMarkers();
                    me.resizeMap();
                    setTimeout(me.lookupAddress.bind(me, me.address), 300);
                }, 1);
            });
        },
        
        render: function () {
            this.map = new google.maps.Map(this.element, this.mapOptions);
            this.map = this.lookupAddress(this.address);
            //return this;
        },
        
        placeMarker: function (location, address) {
            var infoWindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: this.map,
                position: location,
                animation: google.maps.Animation.DROP
            });
            infoWindow.setContent('<div><strong>' + address + '</strong><br>'); // jshint ignore:line
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(this.map, marker);
            });
            this.markers.push(marker);
        },
        
        clearMarkers: function () {
            if (!this.markers) return;
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers.length = 0;
        },
        
        lookupAddress: function (address) {
            this.address = address;
            var self = this;
            if (!this.map) {
                this.map = new google.maps.Map(self.$element[0],self.mapOptions);                
            }
            self.geocoder.geocode( { 'address' : address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    self.map.setCenter(results[0].geometry.location);
                    self.map.setZoom(14);
                    self.clearMarkers();
                    self.placeMarker(results[0].geometry.location, results[0].formatted_address); // jshint ignore:line
                } else {
                    //Need to insert an error message here
                    // Error would appear from GeocoderStatus, it can return, 'ZERO_RESULTS'; 'OVER_QUERY_LIMIT'; 'REQUEST_DENIED'; and 'INVALID_REQUEST'.
                }
            });
        },
        
        resizeMap: function () {
            if (!this.map) {
                this.map = new google.maps.Map(this.element,this.mapOptions);
            }
            var center = this.map.getCenter();
            google.maps.event.trigger(this.map, "resize");
            this.map.setZoom( this.map.getZoom() );
            this.map.setCenter(center);
        }
          
    });
    
});