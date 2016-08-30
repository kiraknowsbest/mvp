var BackpackFinder = angular.module('BackpackFinder', [
  'BackpackFinderCtrl',
  'ngRoute'
]);


BackpackFinder.controller('BackPackFinderCtrl', [
  '$routeProvider',
  '$scope',
  '$http',
  'ngRoute',
  function($routeProvider, $scope, $http) {
    $scope.searchData = function(name) {
      $scope.playerName = name;
      $http({
        method: 'POST',
        url: '/show',
        params: {name: name}
      }).success(function(gameData) {
        console.log('gameData: ', gameData);
        $scope.gameData = gameData;
        $scope.wins = 0;
        $scope.losses = 0;
        for(var i = 0; i < $scope.gameData.length; i++) {
          if($scope.gameData[i]) {
            $scope.wins++;
          } else {
            $scope.losses++;
          }
        }

      });
      $scope.leagueName = "";
    }
  }]);


BackpackFinder.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'BackpackFinderCtrl'
    });
});
// angular.module('BackpackFinder.utils', [])

// .factory('Utils', function ($http) {
//   return {
//     lookUp: function (data) {
//       return $http({
//         method: 'POST',
//         url: '/show',
//         data: data
//       })
//       .then(function (response) {
//         return response;
//       });
//     }
//   };
// })

// angular.module('BackpackFinderCtrl');
// angular.module('BackPackFinder.login', [])

// .controller('LoginController', function ($scope, Utils) {  
//   $scope.user = {};
//   user.name = $scope.user;
//   user.pass = $scope.pass;
//   console.log('got the username and pass:', $scope.user);

//   Utils.login($scope.user)
//   .then(function(result) {
//     console.log(results);
//   });
// });



// angular.module('BackpackFinder.utils', [])
// .factory('Utils', function($http) {
//   return {
//     login: function(user) {
//       return $http({
//         method: 'POST',
//         url: '/login',
//         data: user
//       });
//     }
//   }
// });