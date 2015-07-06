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
        $rootScope.noResultsFlag=false;
        var getAdvancedSearchResults = function(results) {
            $rootScope.showSpinner = true;
             $rootScope.noResultsFlag = false;
            return $http.get('https://api.fda.gov/drug/event.json?search=' + results)
                .success(function(response) {
                    $rootScope.showSpinner = false;
                    return response;
                })
                .error(function(data, status, headers, config) {
                     $rootScope.showSpinner = false;

                    if ( status == "404") {
                      $rootScope.noResultsFlag = true;
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