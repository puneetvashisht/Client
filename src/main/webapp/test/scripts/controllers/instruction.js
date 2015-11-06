'use strict';

/**
 * @ngdoc function
 * @name testEngineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testEngineApp
 */
angular.module('testEngineApp')
  .controller('InstructionCtrl', function ($scope, $location, LoginService, LandingService, $http, TestService) {
	//$scope.loginService = LoginService; 
	$scope.landingService = LandingService;
	$scope.testService = TestService;
	$scope.loginService = LoginService;
  	console.log("***LoginService in about cntrl : "+$scope.loginService);
  	console.log($scope.loginService);
	  $http.defaults.useXDomain = true;
      console.log("In InstructionController");
      
      
      // --- POC ---- into resolve..
     //$scope.loginService.loginDetails.user=null;
     /* if($scope.loginService.loginDetails.user==null)
      {
     		$location.path("/");
      }*/

      $scope.loadData= function () {
          console.log("Kht : " + $scope.loginService.loginDetails.user.kht);

          $http({
              method: 'GET',
//              url: 'dummy/questions.json'
              // to reduce attempt by one hit db
//              url: '/TestApp' + '?kht=' + $scope.loginService.loginDetails.user.kht
//		url: 'dummy/reduced.json'

//            url: '/TestApp' + '?quizId='+$scope.landingService.currentQuizId +'&kht=' + $scope.loginService.loginDetails.user.kht
              url: '/TKHTS/TestApp' + '?quizId='+$scope.landingService.currentQuizId +'&kht=' + $scope.loginService.loginDetails.user.kht

              
            }).success(function (data, status, headers, config) {
              console.log("Data Fetched Suessfully");
              console.log(status);
              console.log("coming data is ");
              console.log(data);
              /*
              var isReduced = new Boolean(data).valueOf()
              console.log(isReduced);
              if(isReduced===true){
            	  $location.path("/test");
              }
              else{
            	  $location.path("/");
              }
              */
              
              if(data.isReduced===true){
            	  $location.path("/test");
              }
              else{
            	  $location.path("/");
              }
            }).error(function (data, status, headers, config) {
              console.log("Error Fetching Data");
              console.log(status);
              console.log(data);
            });
    	  
      	
      }
     
  });