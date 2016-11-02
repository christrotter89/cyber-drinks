angular.module('cyberDrinks')
.service('MapAPI', function(){

	var self = this;
	this._maxBars = 100;

	this.createMap = function(lat,lon, zoom) {
		
		//Share properties with service
		self.latLon = new google.maps.LatLng(lat, lon);

		//Create and render map
		self.map = new google.maps.Map(document.getElementById('map'), {
			zoom: zoom,
			center: self.latLon
		});

		this.searchNearby();

		//Ensure map is centered on window resize
		google.maps.event.addDomListener(window, "resize", function() {
		    var center = self.map.getCenter();
		    google.maps.event.trigger(self.map, "resize");
		    self.map.setCenter(center); 
		});
	};

	this.searchNearby = function(){
		self.placesService = new google.maps.places.PlacesService(self.map);

		//https://developers.google.com/maps/documentation/javascript/places
		// Strategy is to extract all bars near to the provided latLon. As a result, Google API requires location (lat and lon provided), a radius and a type of places (bars in this case). Possible to rankBy DISTANCE but this only retrieves from short distance away.

		var placesQuery = {
			location: self.latLon,
			radius: 2500,
			type: 'bar'
		};

		var placesSearch = self.placesService.nearbySearch(placesQuery, function(bars, status){
			
			if (status == google.maps.places.PlacesServiceStatus.OK){
				//Restrict places to 100 locations
				var maxBars = Math.min(bars.length, self._maxBars);
				for (i=0; i<(maxBars-1); i++) {
					self.createMarker(bars[i]); //Create marker from bar
				}
			}
		});
	};

	this.createMarker = function(bar){

		var markerOptions = {
			position: bar.geometry.location,
			map: self.map,
			clickable: true
		};

		var marker = new google.maps.Marker(markerOptions);

		//create closure to pass in bar to enable display in infowindow on click of marker
		google.maps.event.addListener(marker, "click", function(bar, marker){
			return function(){
				self.displayInfoWindow(bar, marker);
			}	
		}(bar,marker));
	};

	this.displayInfoWindow = function(bar, marker){
		var infoWindow = new google.maps.InfoWindow();
		infoWindow.setContent(`<b>${bar.name}</b><br/><i>${bar.vicinity}</i>`);
		infoWindow.open(self.map, marker);
	}

})