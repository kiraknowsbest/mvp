angular.module('BackpackFinder', [
  'BackpackFinder.main',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('', {
      templateUrl: 'index.html',
      controller: 'BackpackFinderCtrl'
    })
    .when('/', {
      templateUrl: 'index.html',
      controller: 'BackpackFinderCtrl'
    })
    .otherwise({
      redirectTo: ''
    });
});

BackpackFinder.controller('BackpackFinderCtrl', BackpackFinderCtrl);
  BackpackFinderCtrl.$inject = ['$scope', '$routeProvider', '$location', 'ngRoute'];
  function($scope, $location, $http) {
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
});

// var BackpackFinder = angular.module('BackpackFinder', [
//   'ngRoute'
// ]);

// // angular.module('BackpackFinder.utils', [])

// // .factory('Utils', function ($http) {
// //   return {
// //     lookUp: function (data) {
// //       return $http({
// //         method: 'POST',
// //         url: '/show',
// //         data: data
// //       })
// //       .then(function (response) {
// //         return response;
// //       });
// //     }
// //   };
// // })

// BackpackFinder.controller('BackPackFinderCtrl', [
//   '$scope',
//   '$http',
//   function($scope, $http) {
//     $scope.searchData = function(name) {
//       $scope.playerName = name;
//       $http({
//         method: 'POST',
//         url: '/show',
//         params: {name: name}
//       }).success(function(gameData) {
//         console.log('gameData: ', gameData);
//         $scope.gameData = gameData;
//         $scope.wins = 0;
//         $scope.losses = 0;
//         for(var i = 0; i < $scope.gameData.length; i++) {
//           if($scope.gameData[i]) {
//             $scope.wins++;
//           } else {
//             $scope.losses++;
//           }
//         }

//       });
//       $scope.leagueName = "";
//     }
//   }]);

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