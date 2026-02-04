// Google Maps
(function(e) {
	"use strict";
    var $map = $('.js-map');
    var event = e === 'update';
    if(event) {
        $map = $('.mfp-wrap').find('.js-map');
        if(!$map.length || $map.hasClass('js-map-ready')) return;
        $map.addClass('js-map-ready');
    }

    $map.each(function() {
        var $this = $(this);
        var gPosition = {
            lat: $this.data('latitude') ? $this.data('latitude') : 40.6885527,
            lng: $this.data('longitude') ? $this.data('longitude') : -73.9423425
        };
        var mapStyle = {
            "grey": [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}],

        }
        var gMap = new google.maps.Map($this[0], {
            zoom: 14,
            draggable: function() {
                if(Modernizr.touchevents) {
                    return $this.data('draggable') === false ? false : true;
                }
            },
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            scrollwheel: false,
            center: gPosition
        });

        gMap.setOptions({
            styles: mapStyle.grey
        });

        var image = $this.data('marker') ? $this.data('marker') : 'assets/img/svg/map-marker.svg';
        var marker = new google.maps.Marker({
          position: gPosition,
          map: gMap,
          icon: image
        });
    });
})(jQuery);