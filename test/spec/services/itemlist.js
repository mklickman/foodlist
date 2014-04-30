'use strict';

describe('Service: ItemList', function () {

  // load the service's module
  beforeEach(module('foodlistApp'));

  // instantiate service
  var ItemList;
  beforeEach(inject(function (_ItemList_) {
    ItemList = _ItemList_;
  }));

  it('should do something', function () {
    expect(!!ItemList).toBe(true);
  });

});
