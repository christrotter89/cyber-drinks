angular.module('cyberDrinks')
.service('MapAPI', function(){

	this.createMap = function(lat,lon, zoom) {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: zoom,
			center: new google.maps.LatLng(lat, lon)
		});
	};

})