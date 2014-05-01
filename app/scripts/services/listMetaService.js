'use strict';

angular.module('foodlistApp')
  .factory('listMetaService', ['Firebase', '$firebase', function (Firebase, $firebase) {
    var ref = new Firebase('https://foodlist.firebaseio.com/meta');
    return $firebase(ref);
  }])
;
