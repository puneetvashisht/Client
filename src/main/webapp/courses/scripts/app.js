'use strict';

/**
 * @ngdoc overview
 * @name testEngineApp
 * @description
 * # testEngineApp
 *
 * Main module of the application.
 */

var feedbackApp = angular.module('feedbackApp', [
  /*'ngAnimate',
   'ngCookies',
   'ngResource',*/
  'ngRoute',
  /*'ngSanitize',
   'ngTouch',*/
  //'timer'
  'LocalStorageModule',
  'ui.bootstrap',
  'commonApp'
]);

feedbackApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setStorageType('sessionStorage');
  localStorageServiceProvider.setPrefix('tk');
}]);

feedbackApp.config(function ($routeProvider) {
  $routeProvider
    .when('/java', {
      templateUrl: 'views/java.html',
          controller: 'FeedbackCtrl'
    })    
    .when('/advjava', {
        templateUrl: 'views/advjava.html',
          controller: 'FeedbackCtrl'
        
    })
      .when('/ui', {
          templateUrl: 'views/ui.html',
          controller: 'FeedbackCtrl'

      })
      .when('/ocjp', {
          templateUrl: 'views/ocjp.html',
          controller: 'FeedbackCtrl'

      })

    /*
    .when('/landing', {
      //redirectTo: 'http://localhost:63342/VLE/app/test/index.html#/landing'
      redirectTo: 'http://www.google.com'
    })*/
    .otherwise({
      redirectTo: '/java'
    });
});

feedbackApp.directive('tkLeftPane', function ($templateCache) {
    return{
        restrict: 'E',
        templateUrl: 'views/courses-leftpane.html'
    }
})
