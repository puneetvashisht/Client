'use strict';

/**
 * @ngdoc function
 * @name testEngineApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the testEngineApp
 */
angular.module('testEngineApp')

  .factory('LandingService', function ($http, $location) {
    var obj = {
      quizs: {},
      currentQuizId: {}
    };
    return obj;
  })
/*  .factory('LoginService', function () {
    var obj = {
      loginDetails: {"userName": null, "password": null}
    };
    return obj;
  })*/
  .controller('LandingCtrl', function ($scope, TestService, $location, LoginService, LandingService, $http, localStorageService) {
    $http.defaults.useXDomain = true;
    /*
    $scope.landingService = LandingService;

    $scope.loginService = LoginService;
    */
    $scope.landingService = LandingService;
	$scope.loginService = LoginService;

    $scope.testService = TestService;
    
    console.dir($scope.testService);

    if(!$scope.loginService.loginDetails.userName){
    	$scope.loginService.loginDetails = localStorageService.get('loginDetails');
        console.log('333333333');
    	console.log($scope.loginService);
    }

    console.dir($scope.loginService.loginDetails.quizs);
    console.dir($scope.loginService.loginDetails.quizs[0].tl);
    console.dir($scope.loginService.loginDetails.quizs.length);


    /*console.dir($scope.loginService.loginDetails==null);
    console.dir($scope.aa);
    console.dir(!$scope.aa);
    console.dir($scope.loginService);
    console.dir(!$scope.loginService);
    console.dir(!!$scope.loginService);*/

    //if(!!$scope.loginService.loginDetails){
    /*if(!$scope.loginService.loginDetails.userName){
      //alert('not found');
      var loginDetails = localStorageService.get('loginDetails');
      console.dir(loginDetails);
      if (loginDetails){
        console.dir(loginDetails);
        $scope.loginService.loginDetails = loginDetails;
        console.dir($scope.loginService.loginDetails);
        //sessionStorage.removeItem('loginDetails');
        console.dir("done");
      }
      else{
        window.location.replace("http://localhost:63342/VLE/app/user/index.html#/");
      }
    }*/
/*
    else{
      alert('found');
    }
*/
/*

    var loginDetails = localStorageService.get('loginDetails');
    console.dir(loginDetails);
    if (loginDetails){
      console.dir(loginDetails);
      $scope.loginService.loginDetails = loginDetails;
      console.dir($scope.loginService.loginDetails);
      //sessionStorage.removeItem('loginDetails');
      console.dir("done");
    }
    else{
      $location.path("/VLE/app/user/views/login.html");
    }
*/


    console.dir("++--++--++--++--++--++--++--++--++--++--++--++--++--");
    console.dir($scope.loginService);
    if ($scope.loginService.loginDetails.user == null) {
//       		$location.path("/");
    }
    else {
      /*$scope.selectQuiz = function (index, tl) {
        console.dir("Index" + index);
        $scope.testService.tl = tl;
        $scope.landingService.currentQuizId = index;*/
    	$scope.selectQuiz = function (index, tl, prefferedBehaviour, quizName) {
            console.log("Index : " + index);
            $scope.testService.tl = tl;
            $scope.testService.prefferedBehaviour = prefferedBehaviour;
            $scope.testService.quizName = quizName;
            console.log("**/////////////////****************-----------++++++++++++++++++++++++++++++++++++");
            console.log($scope.testService);
            $scope.landingService.currentQuizId = index;
        console.dir('************++++++++' + $scope.landingService.currentQuizId);
//            	$location.path("/instruction");

//            	console.dir("In InstructionController LoadData: " + $scope.landingService.currentQuizId);
        $http({
          method: 'GET',
//          url: 'dummy/questions.json'
//          url: '/TestApp' + '?quizId=' + index
          url: '/TKHTS/TestApp' + '?quizId=' + index
        }).success(function (data, status, headers, config) {
          console.dir("Data Fetched Suessfully");
          console.dir(status);
          console.dir("coming data is ");
          console.dir(data);
          console.dir(config);
          $scope.testService.questions = data;
          console.dir($scope.testService);
          console.dir("++++++++++++++++++++++++++");
          $scope.testService.currentQuestion = $scope.testService.questions[$scope.testService.currentIndex];
          $location.path("/instruction");

        }).error(function (data, status, headers, config) {
          console.dir("Error Fetching Data");
          console.dir(status);
          console.dir(data);
        });
      }
    }

  });