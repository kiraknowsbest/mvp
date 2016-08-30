var BackpackFinder = angular.module('BackpackFinder', []);

BackpackFinder.controller('BackPackFinderCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $http.get('/show').success(function(gameData) {
      // $scope.gameData = gameData;
      console.log(gameData);
      // $scope.playerName = "testyTheMcTester";
      // $scope.wins = 0;
      // $scope.losses = 0;
      // for(var i = 0; i < $scope.gameData.length; i++) {
      //   if($scope.gameData[i].stats.win) {
      //     $scope.wins++;
      //   } else {
      //     $scope.losses++;
      //   }
      // }
    });
    // $scope.greetings = [{greet: 'yo'}, {greet: 'hi'}, {greet: 'hey man'}];
  }]);



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