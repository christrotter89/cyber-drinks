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

.controller('main', function($scope, Api) {
$scope.helloworld = 'testing';

})

.controller('belfast', function($scope) {


})


.controller('london', function($scope) {


})