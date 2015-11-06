'use strict';

/**
 * @ngdoc overview
 * @name testEngineApp
 * @description
 * # testEngineApp
 *
 * Main module of the application.
 */

var myApp = angular.module('testEngineApp', [
  'ngRoute',
  'timer',
  'LocalStorageModule',
  'commonApp',
  'ngTouch'
]);

myApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setStorageType('sessionStorage');
  localStorageServiceProvider.setPrefix('tk');
}]);



/*
myApp.validateAuthenticated = function ($q, $location, LoginService) {
  var defer = $q.defer();
  console.log('Promise ***********2222');
  console.dir(LoginService);
  console.log(LoginService.loginDetails.authenticated);
  console.log(LoginService.loginDetails.authenticated === true);
  
//	if (LoginService.loginDetails.authenticated) {
	if (commonApp.valiputed) {
	    console.log('Promise ***********3333 Resolve');
	    defer.resolve("User Validation Successful");
	} else {
	    console.log('Promise ***********4444 Reject');
	    defer.reject("User Validation Failed");
	    $location.path("/");
	}
}	
*/	
myApp.config(function ($routeProvider) {
  $routeProvider

    .when('/test', {
      templateUrl: 'views/test.html',
      controller: 'TestCtrl',
      resolve: {
//        validate: myApp.validateAuthenticated
          validate: commonApp.validateAuthenticated
      }
    })
    .when('/landing', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl',
       resolve: {
//           validate: myApp.validateAuthenticated
           validate: commonApp.validateAuthenticated
       }
    })/*
    .when('/VLE/app/test/views/landing', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
      *//* resolve: {
       validate: myApp.validateAuthenticated
       }*//*
    })*/
    .when('/report', {
      templateUrl: 'views/report.html',
      controller: 'ReportCtrl'
    })
    .when('/instruction', {
      templateUrl: 'views/instruction.html',
      controller: 'InstructionCtrl',
      resolve: {
//        validate: myApp.validateAuthenticated
          validate: commonApp.validateAuthenticated
      }

    })
    .otherwise({
    	redirectTo: '/landing'
    });
});