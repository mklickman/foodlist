'use strict';

angular.module('foodlistApp')
  .factory('itemListService', ['Firebase', '$firebase', function (Firebase, $firebase) {
    var ref = new Firebase('https://foodlist.firebaseio.com/items');
    return $firebase(ref);
  }])
;
