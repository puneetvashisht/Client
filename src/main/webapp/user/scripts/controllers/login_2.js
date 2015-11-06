'use strict';

/**
 * @ngdoc function
 * @name testEngineApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the testEngineApp
 */
angular.module('authApp')
  /*.factory('LoginService', function () {
   var obj = {
   loginDetails: {"userName": null, "password": null}
   };
   return obj;
   })*/
   
/*   .factory('ErrMsgService', function () {
			var obj = {
					message: null
			};
			return obj;
		})
	*/	
//  .controller('LoginCtrl', function ($scope, LoginService, $http, $location, MsgService, localStorageService, ErrMsgService) {
  .controller('LoginCtrl', function ($scope, LoginService, $http, $location, localStorageService) {
    $http.defaults.useXDomain = true;
    $scope.loginService = LoginService;
//    $scope.msgService = MsgService;
//    $scope.errMsgService = ErrMsgService;


    console.dir($scope.loginService);
    console.dir("LoginService in login cntrl " + $scope.loginService);
    console.dir($scope.loginService);


    $scope.localStorageService = localStorageService;

    /*        $scope.loadData= function () {
     $http({
     method: 'GET',
     //url: 'dummy/feddback.json'
     url: 'http://localhost:9000/dummy/feddback.json'
     }).success(function (data, status, headers, config) {
     console.dir("Data Fetched Successfully");
     console.dir(status);
     console.dir(data);
     console.dir(config);
     console.dir("*******************************");
     conslole.log("Scope login service is : "+$scope.loginService);
     conslole.log("login service is : "+LoginService);


     }).error(function (data, status, headers, config) {
     console.dir("Error Fetching Data");
     console.dir(status);
     console.dir(data);
     });
     };*/

    $scope.submitData = function () {

      console.dir($scope.loginService.loginDetails);
      $http({
        method: 'POST',
//        url: 'dummy/authentication.json',
        url: '/AuthenticationApp',
//  	url: '/AuthenticationApp',      
        data: $scope.loginService.loginDetails
      }).success(function (data, status, headers, config) {

        console.dir("Data Fetched Successfully");
        console.dir(status);
        console.dir(data);
        console.dir(config);
        $scope.loginService.loginDetails = data;
        console.dir("User***************");
/*        console.dir($scope.loginService.loginDetails.user);
        console.dir($scope.loginService.loginDetails.user.authenticated);*/
        if (!!$scope.loginService.loginDetails.user) {
          console.dir("User *********************************");
          console.dir($scope.loginService.loginDetails.user);
          console.dir("user coming from the server is : " + $scope.loginService.loginDetails);
          console.dir($scope.localStorageServiceProvider);
          if ($scope.loginService.loginDetails.user.authenticated) {
            console.dir("store in sessionStorage");
            //sessionStorage.setItem('loginDetails', JSON.stringify(data));
            localStorageService.set('loginDetails', JSON.stringify(data));
            //sessionStorage.setItem('loginDetails',data);
            //$location.path($scope.trustSrc("http://localhost:63342/VLE/app/test/index.html#/landing"));

            //$location.path("http://localhost:63342/VLE/app/test/index.html#/landing");
            //alert("hello");
            //$location.path("/landing");

            var previousPath = localStorageService.get('previousPath');
            localStorageService.remove('previousPath');
             
             if(!previousPath){
            	$location.path("/login-success");
            }
            else{
            	 var isLoginPage = previousPath.slice(previousPath.indexOf('#')+1) == "/login";
                 console.log(previousPath);
                 console.dir(isLoginPage);
            	if(isLoginPage === true){
            		$location.path("/login-success");
            	}
            	else{
            		window.location.replace(previousPath);
            	}
            }



            //window.location.replace("http://localhost:63342/VLE/app/test/index.html#/landing");
            //location.replace("http://www.tkhts.com");
            //$location.url("http://www.tkhts.com");
            //console.dir($location);

          }
        }
        else {
//          $scope.errMsgService.msg = 'Wrong username/password';
          $scope.errorMessage = 'Wrong username/password';
//          console.dir("Error Msg: " +$scope.errMsgService.msg);
          console.dir("Error Msg: " +$scope.errorMessage);
         // $location.path("/");
        }
      }).error(function (data, status, headers, config) {
        console.dir("Error Fetching Data");
        console.dir(status);
        console.dir(data);
      });
    };


    $scope.guestUserData = function () {

      $scope.loginService.loginDetails.userName = "guest";
      $scope.loginService.loginDetails.password = "guest";

      $scope.submitData();
    };

  });











