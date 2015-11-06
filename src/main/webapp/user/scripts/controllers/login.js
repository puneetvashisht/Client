'use strict';

angular.module('authApp')

  .controller('LoginCtrl', function ($scope, LoginService, $http, $location, localStorageService) {
    $http.defaults.useXDomain = true;
    $scope.loginService = LoginService;

    console.dir($scope.loginService);
    console.dir("LoginService in login cntrl " + $scope.loginService);
    console.dir($scope.loginService);

    $scope.localStorageService = localStorageService;

    $scope.submitData = function () {

      console.dir($scope.loginService.loginDetails);
      $http({
        method: 'POST',
        //url: 'dummy/authentication.json',
//        url: '/04Client/AuthenticationApp',
        url: '/04Client/rest/services/authenticate',
        //        url: '/AuthenticationApp',
        data: $scope.loginService.loginDetails
      }).success(function (data, status, headers, config) {
    	  
        console.dir("Data Fetched Successfully");
        console.dir(status);
        console.dir(data);
        console.dir(config);
        $scope.loginService.loginDetails = data;
        console.dir("User***************");

        if (!!$scope.loginService.loginDetails.user) {
          console.dir("User *********************************");
          console.dir($scope.loginService.loginDetails.user);
          console.dir("user coming from the server is : " + $scope.loginService.loginDetails);
          if ($scope.loginService.loginDetails.user.authenticated) {
            console.dir("store in sessionStorage");

            localStorageService.set('loginDetails', JSON.stringify(data));
              LoginService.loginDetails.authenticated = true;
            	$location.path("/login-success");
          }
        }
        else {
          $scope.errorMessage = 'Wrong username/password';

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
    
    
    /*$scope.email = "root@localhost";
    $scope.currentPassword = "abc";
    $scope.newPassword = "xyz";
    $scope.confirmPassword = "xyzs";
    $scope.errorMsg = "error";*/
    
    $scope.getMyPassword = function () {
    	console.log($scope.email);
    	$http({
            method: 'GET',
//            url: 'dummy/password.json',
            url: '/TKHTS/PasswordApp?email='+$scope.email
    	}).success(function (data, status, headers, config) {
    		console.log(data);
    }).error(function (data, status, headers, config) {
  	  console.log("Some error occurred on the server");
    });
    }
    $scope.getPassword = function () {
        if($scope.newPassword === $scope.confirmPassword){
      	  console.log("Same");
      	  $scope.errorMsg = "";
      	  var pwdDetails = {};
            pwdDetails.email = $scope.email;
            pwdDetails.currentPassword = $scope.currentPassword;
            pwdDetails.newPassword = $scope.newPassword;
            pwdDetails.kht = $scope.loginService.loginDetails.user.kht;
            console.log(pwdDetails);
            
            $http({
                method: 'POST',
//                url: 'dummy/password.json',
//                url: '/TKHTS/PasswordApp?email='+$scope.email+'&pwd='+$scope.password+'&kht='+kht,
                url: '/TKHTS/PasswordApp',
                data: pwdDetails
              }).success(function (data, status, headers, config) {
            	  console.log(data);
            	  if(data.password){
            		  console.log("Password is sent to "+ $scope.email);
            	  }
            	  else{
            		  console.log($scope.email+" is not found in database.");
            	  }
              }).error(function (data, status, headers, config) {
            	  console.log("Some error occurred on the server");
              });
      	  
        }
        else{
      	  console.log("not same");
      	  $scope.errorMsg = "passwords not matched";
        }

      };

  });