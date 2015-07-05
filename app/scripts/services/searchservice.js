'use strict';
/**
 * @ngdoc service
 * @name searchPrototypeApp.d3Service
 * @description
 * # searchservice
 * Factory in the searchPrototypeApp.
 */

/*angular.module('searchPrototypeApp').factory('searchService', function ($http) {
console.log('in searchService');

console.log(results);
  return $http.get('https://api.fda.gov/drug/event.json?search='+results);
});*/


(function() {

  var searchService = function($http) {

    var getBasicSearchResults = function(results){
      return $http.get('https://api.fda.gov/drug/event.json?search='+results + "&limit=10")
                .then(function(response){
                  return response;
                });
    };


    return {
        getBasicSearchResults: getBasicSearchResults
    };

  };

  var module = angular.module("searchPrototypeApp");
  module.factory("searchService", searchService);
}());
