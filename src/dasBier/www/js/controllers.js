angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout) {
    $scope.phoneHome = function(){
        $state.go('app.search');
    };
})
.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
    $scope.form = {};
    $scope.search = function() {
    parms = {}
    if($scope.form.name){
        parms.name = $scope.form.name;
    }
    if($scope.form.year){
        parms.year = $scope.form.year;
    }
    if($scope.form.ibu){
        parms.ibu = $scope.form.ibu;
    }
    if($scope.form.abv){
        parms.abv = $scope.form.abv + "," + ($scope.form.abv+1);
    }
    //if($scope.form.isOrganic){
        parms.isOrganic = $scope.form.organic ?"Y":"N";
    //}
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: parms,
      
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        BeerData.data = response.data;
        
        $state.go('app.beers');
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      }); 
    }
})

//you can now shove stuff into the data package for others to use; talks data across controlles, the only way to do this
.factory('BeerData', function(){
    return {data: {}};
})
.factory('IndieBeerData', function(){
  return {data: {}};
})

.controller('BeersCtrl', function($scope, $state, BeerData, IndieBeerData) {
  console.log(BeerData.data)
  //change the playlists to display the data from BeerData.data
  $scope.playlists = BeerData.data.data;
  $scope.getBeerDetails = function(playlist) {
      IndieBeerData.data = playlist;
      console.log('Before passing data');
      $state.go('app.beer');
  }
})

.controller('BeerCtrl', function($scope, $state, $stateParams, BeerData, IndieBeerData) {
    $scope.beerDetails = IndieBeerData.data;
    console.log("BeerCtrl activated");
    console.log(IndieBeerData);
    console.log(IndieBeerData.data.nameDisplay);
    console.log(IndieBeerData.data.id);
});
