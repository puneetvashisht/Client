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
    .when('/', {
      templateUrl: 'views/feedback.html',
      controller: 'FeedbackCtrl',
      resolve: {
        validate: commonApp.validateAuthenticated
      }
    })
    .when('/testimonials', {
        templateUrl: 'views/testimonials.html',
          controller: 'TestimCtrl'
        
    })
    .when('/survey', {
        templateUrl: 'views/survey.html'
    })
    /*
    .when('/landing', {
      //redirectTo: 'http://localhost:63342/VLE/app/test/index.html#/landing'
      redirectTo: 'http://www.google.com'
    })*/
    .otherwise({
      redirectTo: '/'
    });
});
