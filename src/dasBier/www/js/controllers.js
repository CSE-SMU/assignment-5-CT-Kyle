angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
        //console.log(BeerData.data);
        
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

.controller('BeersCtrl', function($scope, BeerData) {
  console.log(BeerData.data)
  //change the playlists to display the data from BeerData.data
  $scope.playlists = BeerData.data.data;
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
    //this will let you see the id of the beer that you have selected
    console.log("BeerCtrl activated");
    console.log(BeerData.data.data)
    console.log($stateParams.id);
});
