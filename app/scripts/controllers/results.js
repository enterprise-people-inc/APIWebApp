'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the searchPrototypeApp
 */
var results = [];
angular.module('searchPrototypeApp')
    .controller('ResultsCtrl', function($scope, $rootScope, $location, $timeout, searchService, advancedSearchService, $interval, $http) {
        $scope.results = [];
        $scope.limit = 10;
        $scope.skip = 0;
        $scope.total = 0;
        $scope.showResults = false;

        $scope.metaresults = null;
        $scope.page = 1;
        $scope.maxPage = 0;
        $scope.maxSize = 5;
        $scope.renderResults = false;

        $scope.resultArray = [];

        function buildQuery($scope) {
            var str = "";
            if ($scope.from_date && $scope.to_date) {
                // var date_from_date = $filter('date')($scope.from_date, "yyyy-mm-dd");
                // var date_to_date = $filter('date')($scope.to_date, "yyyy-mm-dd");
                str += "receivedate:[" + $scope.from_date + "+TO+" + $scope.to_date + "]";
            } else {
                str += "receivedate:[2004-01-01+TO+2015-06-26]";
            }

            if ($scope.from_age && $scope.to_age) {
                str += "+AND+patient.patientonsetage:[" + $scope.from_age + "+TO+" + $scope.to_age + "]";
            }

            if ($scope.drugbrandname) {
                str += "+AND+patient.drug.openfda.brand_name:(" + $scope.drugbrandname + ")";
            }

            if ($scope.druggenericname) {
                str += "+AND+patient.drug.openfda.generic_name:(" + $scope.druggenericname + ")";
            }

            if ($scope.reactionmeddrapt) {
                str += "+AND+patient.reaction.reactionmeddrapt:(" + $scope.reactionmeddrapt + ")";
            }

            if ($scope.drugindication) {
                str = "+AND+patient.drug.drugindication:(" + $scope.drugindication + ")";
            }

            if ($scope.productndc) {
                str += "+AND+patient.drug.openfda.product_ndc:(" + $scope.productndc + ")";
            }

            if ($scope.country) {
                str += "+AND+primarysource.reportercountry:(%22" + $scope.country + "%22)";
            }

            if ($scope.medicinalproduct) {
                str += "+AND+patient.drug.medicinalproduct:(" + $scope.medicinalproduct + ")";
            }

            if ($scope.safetyreportid) {
                str += "+AND+safetyreportid:(" + $scope.safetyreportid + ")";
            }

            if ($scope.drugclass) {
                str += "+AND+patient.drug.openfda.pharm_class_epc:(" + $scope.drugclass + ")";
            }


            if ($scope.searchParam) {
                str += "+AND+(" + $scope.searchParam + ")";
            }

            str += "&limit=" + $scope.limit + "&skip=" + $scope.skip;// + "&page=" + $scope.page;
            return str ;
        }

        $scope.submit = function(generalSearch) {
            $scope.renderResults = true;
            $rootScope.searchParam = generalSearch;
            executeSearch(buildQuery($scope));
        };

        function executeSearch(str) {
            $scope.results = [];
            $scope.renderResults = true;
            advancedSearchService.getAdvancedSearchResults(str).then(function(response) {
                updateResults(response);
            });
        }


        $scope.getFDAValues = function(parameter) {
            var data = "";
            for (data in $scope.resultArray) {
                if (data == parameter) {
                    return $scope.resultArray[data];
                }
            }
        }

        $scope.getDrug = function(resultObject) {
            return resultObject.patient.drug;
        }

        $scope.IsObjectExist = function(obj, list) {
            var data = "";
            for (data in list) {
                if (data == obj) {
                    return true;
                }
            }
            return false;
        }
        var getValuestoArray = true;
        $scope.get_values_to_array = function(resultObject) {
            $scope.resultArray = [];
            angular.forEach(resultObject.patient.drug, function(value, key) {
                angular.forEach(value.openfda, function(value1, key1) {
                    if (getValuestoArray) {
                        if (!$scope.IsObjectExist(key1, $scope.resultArray)) {
                            $scope.resultArray[key1] = [];
                            getValuestoArray = false;
                        }
                    }
                    angular.forEach(value1, function(value2, key2) {
                        if (getValuestoArray) {
                            if (!$scope.containsObject(value2, $scope.resultArray[key1])) {
                                $scope.resultArray[key1].push(value2);
                            }
                        }
                    });
                });
            });
            return $scope.resultArray;
        }
        var getPharmClassEpc = true;
        $scope.get_pharm_class_epc = function(resultObject) {
            $scope.get_pharm = [];
            angular.forEach(resultObject.patient.drug, function(value, key) {
                angular.forEach(value.openfda, function(value1, key1) {
                    if (getPharmClassEpc) {
                        if (key1 == "pharm_class_epc") {
                            angular.forEach(value1, function(value2, key2) {
                                if (!$scope.containsObject(value2, $scope.get_pharm)) {
                                    $scope.get_pharm.push(value2);
                                }
                            });
                        }
                        getPharmClassEpc = false;
                    }

                });
            });
            return $scope.get_pharm;
        }

        // var getFdaValues = true;
        // $scope.get_openfda_values = function(resultObject, parameter) {
        //     $scope.temp_array = [];
        //     angular.forEach(resultObject.patient.drug, function(value, key) {
        //         angular.forEach(value.openfda, function(value1, key1) {
        //                 if (key1 == parameter) {
        //                     angular.forEach(value1, function(value2, key2) {
        //                         if (!$scope.containsObject(value2, $scope.temp_array)) {
        //                             $scope.temp_array.push(value2);
        //                         }
        //                     });
        //                     getFdaValues = true
        //             }
        //         });
        //     });
        //     return $scope.temp_array;
        // }


        $scope.get_spl_set_id = function(resultObject) {
            $scope.spl_set_id = [];
            angular.forEach(resultObject.patient.drug, function(value, key) {
                angular.forEach(value.openfda, function(value1, key1) {
                    if (key1 == "spl_set_id") {
                        angular.forEach(value1, function(value2, key2) {
                            if (!$scope.containsObject(value2, $scope.spl_set_id)) {
                                $scope.spl_set_id.push(value2);
                            }
                        });
                    }
                });
            });
            return $scope.spl_set_id;
        }

        var getGenericName = true;
        $scope.get_generic_name = function(resultObject) {
            $scope.generic_name = [];
            angular.forEach(resultObject.patient.drug, function(value, key) {
                angular.forEach(value.openfda, function(value1, key1) {
                    if (getGenericName) {
                        if (key1 == "generic_name") {
                            angular.forEach(value1, function(value2, key2) {
                                if (!$scope.containsObject(value2, $scope.generic_name)) {
                                    $scope.generic_name.push(value2);
                                }
                                getGenericName = false;
                            });
                        }
                        getGenericName = false;
                    }
                });
            });
            return $scope.generic_name;
        }


        $scope.containsObject = function(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i], obj)) {
                    return true;
                }
            }

            return false;
        };

        $scope.getRoute = function(resultObject) {
            return resultObject.openfda.route;
        }

        $scope.$on('$routeChangeSuccess', function(event, data) {
            $rootScope.pageTitle = data.title;
            //$rootScope.searchParam = $scope.results;
            //$scope.searchParam=$rootScope.searchParam;
            //updateResults($scope.response);
        });

        $scope.pageChanged = function(page) {
          $scope.page = page;
          $scope.nextPage = $scope.page - 1;
          $scope.skip = $scope.limit * $scope.nextPage;
            executeSearch(buildQuery($scope));
        }



        function updateResults(response) {
            if (null != response) {
                $scope.arrayObjects = response.data.results;
                var arrayObject = response.data.meta.results;
                for (var prop in arrayObject) {
                    $scope.total = arrayObject['total'];
                };
                $scope.results = response.data.results;
                $scope.limit = response.data.meta.results.limit;
                $scope.skip = response.data.meta.results.skip;
                $scope.metaresults = response.data.meta.results;
                $scope.page = (response.data.meta.results.skip / response.data.meta.results.limit) + 1;
                $scope.maxPage = Math.ceil(response.data.meta.results.total / response.data.meta.results.limit);

            }
        }
    });

angular.module('searchPrototypeApp')
    .directive('onFinishRender', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    scope.$evalAsync(attr.onFinishRender);
                }
            }
        }
    });