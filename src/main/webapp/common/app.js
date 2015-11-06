var commonApp = angular.module('commonApp',['LocalStorageModule','ngRoute']);

commonApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	  localStorageServiceProvider.setStorageType('sessionStorage');
	  localStorageServiceProvider.setPrefix('tk');
}]);

commonApp.path = '/04Client/tkhts/';

commonApp.basePath = '/04Client/';



/*
commonApp.path = '/tkhts/';

commonApp.basePath = '/';
*/


commonApp.valiputed = false;

commonApp.userName = '';

commonApp.run(function($rootScope, $location, LoginService) {
	
  $rootScope.commonPath = commonApp.path;
  $rootScope.basePath = commonApp.basePath;
  $rootScope.valiputed = commonApp.valiputed;
  $rootScope.userName = commonApp.userName;

});

commonApp.factory('LoginService', function () {
  var obj = {
    loginDetails: {"userName": null, "password": null, "authenticated": false}
  };
  return obj;
});


commonApp.directive('tkHeader', function ($templateCache) {
  return{
    restrict: 'E',
//        template: $templateCache.get('zippy.html')


    templateUrl: commonApp.path + 'header.html'
  }

});

commonApp.directive('tkTestHeader', function ($templateCache) {
	  return{
	    restrict: 'E',
//	        template: $templateCache.get('zippy.html')


	    templateUrl: commonApp.path + 'test-header.html'
	  }

	});

commonApp.directive('tkRightPane', function ($templateCache) {
  return{
    restrict: 'E',
//        template: $templateCache.get('zippy.html')
    templateUrl:  commonApp.path + 'rightpane.html'
  }
});

commonApp.directive('tkFooter', function ($templateCache) {
  return{
    restrict: 'E',
//        template: $templateCache.get('zippy.html')

    templateUrl: commonApp.path + 'footer.html'
  }
});

commonApp.validateAuthenticated = function ($q, $rootScope, $window, LoginService, localStorageService) {
  var defer = $q.defer();
  console.dir('Promise ***********6666');

  console.log("commonApp.validateAuthentication");

  if( localStorageService.get('loginDetails') && localStorageService.get('loginDetails').user.authenticated === true){
    console.log('***************************************************');
    console.log("with loginDetails in localStorage");

    LoginService.loginDetails.authenticated = true;
    commonApp.valiputed = LoginService.loginDetails.authenticated;
    commonApp.userName = localStorageService.get('loginDetails').user.userName;

    console.dir('Promise **********7777 Resolve');
    defer.resolve("User Validation Successful");
  }
  else if(LoginService.loginDetails && LoginService.loginDetails.authenticated === true){
    console.log('***************************************************');
    console.log("with LoginService");

    LoginService.loginDetails.authenticated = true;
    commonApp.valiputed = LoginService.loginDetails.authenticated;
    commonApp.userName = LoginService.loginDetails.userName;

    console.dir('Promise **********7777 Resolve');
    defer.resolve("User Validation Successful");
  }

  else{
    console.log("5555555555555555555555 -> reject");

    //localStorageService.set('previousPath', $location.absUrl());

    console.dir('Promise ***********8888 Reject');
    defer.reject("User Validation Failed");

    //window.location.replace('http://www.tkhts.com/user/index.html');
    //$window.location.replace('http://www.tkhts.com/user/index.html');
    $window.location.replace('http://localhost:8080/TKHTS/user/index.html#/login');
    //$location.path('/login');
    //$window.location.replace('http://www.tkhts.com/user/index.html');
  }


  console.dir("return defer.promise");
  console.dir(defer.promise);

  $rootScope.valiputed = commonApp.valiputed;
  $rootScope.userName = commonApp.userName;

  return defer.promise;
}


commonApp.controller('CommonCtrl', function($scope, $rootScope, LoginService, localStorageService, $route){

  console.log('Getting Initialized');

  $scope.logout = function() {
    console.log("user name in scope : " + $scope.userName);
    //console.log("loc : "+ localStorageService.get('feedbackUserDetails'));

    delete LoginService.loginDetails.userName;
    LoginService.loginDetails.authenticated = false;
    commonApp.valiputed = LoginService.loginDetails.authenticated;

    if(localStorageService.get('feedbackUserDetails')){
      localStorageService.remove('feedbackUserDetails');
    }
/*
    if(localStorageService.get('previousPath')){
      localStorageService.remove('previousPath');
    }
*/
    if(localStorageService.get('loginDetails')){
      localStorageService.remove('loginDetails');
    }

    $rootScope.valiputed = commonApp.valiputed;
    $route.reload();
  }



  LoginService.loginDetails.authenticated = !!localStorageService.get('loginDetails')? localStorageService.get('loginDetails').user.authenticated === true : false;
  commonApp.valiputed = LoginService.loginDetails.authenticated;
  console.log("6666666666666666666666666666666 ----> "+commonApp.valiputed);

  $rootScope.valiputed = commonApp.valiputed;

});