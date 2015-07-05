'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the searchPrototypeApp
 */
app.controller('404Ctrl', function($scope, $location) {
    $scope.path = $location.path();
    $scope.back = function() {
        history.back();
    };
});
