'use strict';

angular.module('foodlistApp')
  .controller('MainCtrl', ['$scope', '$firebaseSimpleLogin', 'listMetaService', 'itemListService', function ($scope, $firebaseSimpleLogin, listMetaService, itemListService) {
    var firebase = new Firebase('https://foodlist.firebaseio.com/');

    $scope.meta = listMetaService;
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
      }).then(function() {
        $scope.auth.$getCurrentUser();
        $scope.userCreds = {};
        $scope.signinButtonText = 'Sign In';
      }, function(error) {
        console.log('Firebase SimpleLogin Error: ', error);
        $scope.signinButtonText = 'Sign In';
        $scope.authError = error.message.toString().replace(/firebasesimplelogin\:/ig, '');
      });

      $scope.signinButtonText = 'Signing in...';
    };

    $scope.signOut = function() {
      $scope.auth.$logout();
    };
    
    $scope.addItem = function() {
      $scope.items.$add({
        food: $scope.item.food,
        name: $scope.item.name,
        owner: $scope.auth.user.email
      }).then(function(ref) {
        console.log(ref);
      });
      
      $scope.item.food = '';
      $scope.item.name = '';
    };

    $scope.removeItem = function(item) {
      $scope.items.$remove(item.$id);
    };
  }]);
