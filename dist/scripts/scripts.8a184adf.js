"use strict";angular.module("searchPrototypeApp",["countrySelect"]),angular.module("searchPrototypeApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","angular-spinkit"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/about.html",controller:"AboutCtrl",title:"Enterprise People GSA Prototype"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl",title:"Enterprise People GSA Prototype Search"}).when("/faq",{templateUrl:"views/faq.html",controller:"FaqCtrl",title:"FAQ"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",title:"Enterprise People GSA Prototype Contact Information"}).when("/results/",{templateUrl:"views/results.html",controller:"ResultsCtrl",title:"Enterprise People GSA Prototype Search Results"}).otherwise({controller:"404Ctrl",templateUrl:"views/404.html",title:"No Results"}),b.html5Mode(!0),b.hashPrefix("!")}]);var results;angular.module("searchPrototypeApp").controller("MainCtrl",["$scope","$rootScope","$location","$http","searchService",function(a,b,c,d,e){a.$on("$routeChangeSuccess",function(a,c){b.pageTitle=c.title})}]),angular.module("searchPrototypeApp").controller("AboutCtrl",["$scope","$rootScope",function(a,b){a.$on("$routeChangeSuccess",function(a,c){b.pageTitle=c.title})}]),angular.module("searchPrototypeApp").controller("FaqCtrl",["$scope","$rootScope",function(a,b){a.$on("$routeChangeSuccess",function(a,c){b.pageTitle=c.title})}]),angular.module("searchPrototypeApp").controller("ContactCtrl",["$scope","$rootScope",function(a,b){a.$on("$routeChangeSuccess",function(a,c){b.pageTitle=c.title})}]);var results=[];angular.module("searchPrototypeApp").controller("ResultsCtrl",["$scope","$rootScope","$location","$timeout","searchService","advancedSearchService","$interval","$http",function(a,b,c,d,e,f,g,h){function i(a){var b="";b+=a.from_date&&a.to_date?"receivedate:["+a.from_date+"+TO+"+a.to_date+"]":"receivedate:[2004-01-01+TO+2015-06-26]",a.from_age&&a.to_age&&(b+="+AND+patient.patientonsetage:["+a.from_age+"+TO+"+a.to_age+"]"),a.drugbrandname&&(b+="+AND+patient.drug.openfda.brand_name:("+a.drugbrandname+")"),a.druggenericname&&(b+="+AND+patient.drug.openfda.generic_name:("+a.druggenericname+")"),a.reactionmeddrapt&&(b+="+AND+patient.reaction.reactionmeddrapt:("+a.reactionmeddrapt+")"),a.drugindication&&(b="+AND+patient.drug.drugindication:("+a.drugindication+")"),a.productndc&&(b+="+AND+patient.drug.openfda.product_ndc:("+a.productndc+")"),a.country&&(b+="+AND+primarysource.reportercountry:(%22"+a.country+"%22)"),a.medicinalproduct&&(b+="+AND+patient.drug.medicinalproduct:("+a.medicinalproduct+")"),a.safetyreportid&&(b+="+AND+safetyreportid:("+a.safetyreportid+")"),a.drugclass&&(b+="+AND+patient.drug.openfda.pharm_class_epc:("+a.drugclass+")"),a.searchParam&&(b+="+AND+("+a.searchParam+")");var c="&limit="+a.limit+"&skip="+a.skip;return b+c}function j(b){a.results=[],a.renderResults=!0,f.getAdvancedSearchResults(b).then(function(a){k(a)})}function k(b){if(null!=b){a.arrayObjects=b.data.results;var c=b.data.meta.results;for(var d in c)a.total=c.total;a.results=b.data.results,a.limit=b.data.meta.results.limit,a.skip=b.data.meta.results.skip,a.metaresults=b.data.meta.results,a.page=b.data.meta.results.skip/b.data.meta.results.limit+1,a.maxPage=Math.ceil(b.data.meta.results.total/b.data.meta.results.limit)}}a.results=[],a.limit=10,a.skip=0,a.total=0,a.showResults=!1,a.metaresults=null,a.page=1,a.maxPage=0,a.maxSize=5,a.renderResults=!1,a.resultArray=[],a.submit=function(c){a.renderResults=!0,b.searchParam=c,j(i(a))},a.getFDAValues=function(b){var c="";for(c in a.resultArray)if(c==b)return a.resultArray[c]},a.getDrug=function(a){return a.patient.drug},a.IsObjectExist=function(a,b){var c="";for(c in b)if(c==a)return!0;return!1};var l=!0;a.get_values_to_array=function(b){return a.resultArray=[],angular.forEach(b.patient.drug,function(b,c){angular.forEach(b.openfda,function(b,c){l&&(a.IsObjectExist(c,a.resultArray)||(a.resultArray[c]=[],l=!1)),angular.forEach(b,function(b,d){l&&(a.containsObject(b,a.resultArray[c])||a.resultArray[c].push(b))})})}),a.resultArray};var m=!0;a.get_pharm_class_epc=function(b){return a.get_pharm=[],angular.forEach(b.patient.drug,function(b,c){angular.forEach(b.openfda,function(b,c){m&&("pharm_class_epc"==c&&angular.forEach(b,function(b,c){a.containsObject(b,a.get_pharm)||a.get_pharm.push(b)}),m=!1)})}),a.get_pharm},a.get_spl_set_id=function(b){return a.spl_set_id=[],angular.forEach(b.patient.drug,function(b,c){angular.forEach(b.openfda,function(b,c){"spl_set_id"==c&&angular.forEach(b,function(b,c){a.containsObject(b,a.spl_set_id)||a.spl_set_id.push(b)})})}),a.spl_set_id};var n=!0;a.get_generic_name=function(b){return a.generic_name=[],angular.forEach(b.patient.drug,function(b,c){angular.forEach(b.openfda,function(b,c){n&&("generic_name"==c&&angular.forEach(b,function(b,c){a.containsObject(b,a.generic_name)||a.generic_name.push(b),n=!1}),n=!1)})}),a.generic_name},a.containsObject=function(a,b){var c;for(c=0;c<b.length;c++)if(angular.equals(b[c],a))return!0;return!1},a.getRoute=function(a){return a.openfda.route},a.$on("$routeChangeSuccess",function(a,c){b.pageTitle=c.title}),a.pageChanged=function(b){a.page=b,a.nextPage=a.page-1,a.skip=a.limit*a.nextPage,j(i(a))}}]),angular.module("searchPrototypeApp").directive("onFinishRender",["$timeout",function(a){return{restrict:"A",link:function(a,b,c){a.$last===!0&&a.$evalAsync(c.onFinishRender)}}}]),function(){var a=function(a){var b=function(b){return a.get("https://api.fda.gov/drug/event.json?search="+b+"&limit=10").then(function(a){return a})};return{getBasicSearchResults:b}};a.$inject=["$http"];var b=angular.module("searchPrototypeApp");b.factory("searchService",a)}(),function(){var a=function(a,b,c){b.showSpinner=!1;var d=function(d){return b.showSpinner=!0,a.get("https://api.fda.gov/drug/event.json?search="+d+"&limit=10").success(function(a){return b.showSpinner=!1,a}).error(function(a,d,e,f){return b.showSpinner=!1,"404"==d&&c.path("/404/"),null})};return{getAdvancedSearchResults:d}};a.$inject=["$http","$rootScope","$location"];var b=angular.module("searchPrototypeApp");b.factory("advancedSearchService",a)}(),angular.module("searchPrototypeApp").controller("HeaderController",["$scope","$location",function(a,b){a.isCollapsed=!0,a.isActive=function(a){return a===b.path()}}]);