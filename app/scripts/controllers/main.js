'use strict';

angular.module('foodlistApp')
  .controller('MainCtrl', ['$scope', '$firebaseSimpleLogin', 'ItemListService', function ($scope, $firebaseSimpleLogin, itemListService) {
    var firebase = new Firebase('https://foodlist.firebaseio.com/');
    
    $scope.items = itemListService;
    $scope.userCreds = {};
    $scope.signinButtonText = 'Sign In';
    $scope.item = {};

    $scope.auth = $firebaseSimpleLogin(firebase, function(error, user) {
      if (error) {
        console.log('Firebase Simple Login error:', error);
      } else if (user) {
        console.log('User successfully authenticated:', user);
      } else {
        console.log('User is logged out');
      }
    });

    $scope.signIn = function() {
      
      $scope.auth.$login('password', {
        email: $scope.userCreds.email,
        password: $scope.userCreds.password
      }).then(function(user) {
        console.log(user);
        $scope.auth.$getCurrentUser();
        $scope.userCreds = {};
        $scope.signinButtonText = 'Sign In';
      }, function(error) {
        console.log(error);
        $scope.signinButtonText = 'Sign In';
      });

      $scope.signinButtonText = 'Authenticating...';
    };

    $scope.signOut = function() {
      $scope.auth.$logout();
    };
    
    $scope.addItem = function() {
      $scope.items.$add({
        food: $scope.item.food,
        name: $scope.auth.user.email
      }).then(function(ref) {
        console.log(ref);
      });
      
      $scope.item.food = '';
    };

    $scope.removeItem = function(item) {
      // console.log(item.$id);
      $scope.items.$remove(item.$id);
    };
  }]);
