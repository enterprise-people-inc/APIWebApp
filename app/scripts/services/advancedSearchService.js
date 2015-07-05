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

    var advancedSearchService = function($http, $rootScope, $location) {
         $rootScope.showSpinner = false;
        var getAdvancedSearchResults = function(results) {
            $rootScope.showSpinner = true;
            return $http.get('https://api.fda.gov/drug/event.json?search=' + results + "&limit=10")
                .success(function(response) {
                    $rootScope.showSpinner = false;
                    return response;
                })
                .error(function(data, status, headers, config) {
                     $rootScope.showSpinner = false;
                    if ( status == "404") {
                      $location.path('/404/')
                    }
                    return null;
                });
        };


        return {
            getAdvancedSearchResults: getAdvancedSearchResults
        };

    };


    var module = angular.module("searchPrototypeApp");
    module.factory("advancedSearchService", advancedSearchService);
}());