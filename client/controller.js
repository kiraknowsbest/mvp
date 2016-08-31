// creating main Angular module

var BackpackFinder = angular.module('BackpackFinder', []);


// defining Angular controller

BackpackFinder.controller('BackPackFinderCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {

    // making request for player
    $scope.searchData = function(name) {
      $scope.playerName = name;
      $http({
        method: 'POST',
        url: '/show',
        params: {name: name}
      }).success(function(gameData) {

        // viewing results
        console.log('gameData: ', gameData);
        $scope.gameData = gameData;
        $scope.wins = 0;
        $scope.losses = 0;

        // incrementing wins and losses
        for(var i = 0; i < $scope.gameData.length; i++) {
          if($scope.gameData[i]) {
            $scope.wins++;
          } else {
            $scope.losses++;
          }
        }

      });

      // resetting input box
      $scope.leagueName = "";
    },

    // get all players in list
    $scope.scourge = function() {
      $http({
        method: 'GET',
        url: '/show'
      }).success(function(names) {
        console.log('names: ', names);
      });
    }





  }]);