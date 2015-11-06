'use strict';

var authApp = angular.module('authApp', [
  'ngRoute',
//  'LocalStorageModule',
  'ui.bootstrap',
  'commonApp',
  'facebook'
]);

/*var registerApp = angular.module('registerApp', [
  'ngRoute',
  'LocalStorageModule',
  'ui.bootstrap',
  'commonApp'
]);*/
/*
authApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setStorageType('sessionStorage');
  localStorageServiceProvider.setPrefix('tk');
}]);
*/
/*registerApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setStorageType('sessionStorage');
  localStorageServiceProvider.setPrefix('tk');
}]);*/


authApp.validateAuthenticated = function ($q, $location, RegistrationService) {
	  var defer = $q.defer();
	  console.log('Promise ***********8888++++++');
	  console.dir(RegistrationService);
	  if (RegistrationService.isRegistered === true) {
		    console.log('Promise ***********8888 Resolve');
		    defer.resolve("User Validation Successful");
	  }
	  else {
		    console.log('Promise ***********8888 Reject');
		    defer.reject("User Validation Failed");
		    $location.path("/register");
	  }
	  console.log("return defer.promise");
	  console.log(defer.promise);
	  return defer.promise;
	}

authApp.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
      .when('/fbLogin', {
        templateUrl: 'views/fbLogin.html',
        controller: 'FbLoginCtrl'
      })
      .when('/myAccount', {
        templateUrl: 'views/myAccount.html',
        controller: 'MyAccountCtrl',
        resolve: {
          validate: commonApp.validateAuthenticated
        }
      })
    .when('/register', {
      templateUrl: 'views/registration.html',
      controller: 'RegisterCtrl'
    })
    .when('/reg-success', {
      templateUrl: 'views/reg-success.html',
      controller: 'LoginCtrl',
    	  resolve: {
  	      validate: authApp.validateAuthenticated
//            validate: commonApp.validateAuthenticated
    	       }
    })
    .when('/login-success', {
      templateUrl: 'views/login-success.html',
      controller: 'LoginCtrl',
      resolve: {
//    	       validate: authApp.validateAuthenticated
        validate: commonApp.validateAuthenticated
	       }
    })
    .when('/change-pwd', {
      templateUrl: 'views/change-password.html',
      controller: 'LoginCtrl',
      resolve: {
	       validate: commonApp.validateAuthenticated
	       }
    })
    .when('/forgot-pwd',{
      templateUrl: 'views/pwd.html',
      controller: 'PwdCtrl',
    })
    .otherwise({
      redirectTo: '/login'
    });
});

/*registerApp.config(function ($routeProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'views/registration.html',
      controller: 'RegisterCtrl'
    })
    .otherwise({
      redirectTo: '/register'
    });
});*/