angular.module('cyberDrinks', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: 'templates/homepage.html',
        controller: 'main'
    })
    .otherwise({redirectTo:'/'})
    ;
})

.controller('main', function($scope, MapAPI) {

	$scope.cities = [
		{
			name: 'Belfast',
			lat:  54.596099,
			lon: -5.929351,
			zoom: 16
		},
		{
			name: 'London',
			lat: 51.509865,
			lon: -0.118092,
			zoom: 15
		}];

	//Set default city as Belfast

	$scope.selectedCity = $scope.cities[0];

	//Change city or invoke at render
	$scope.changeCity = function(city){
		if (city) {
			$scope.selectedCity = city;
		}

		var newCity = $scope.selectedCity;

		MapAPI.createMap(newCity.lat, newCity.lon, newCity.zoom);
	}

	$scope.changeCity();
})

