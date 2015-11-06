'use strict';

/**
 * @ngdoc function
 * @name testEngineApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the testEngineApp
 */
angular.module('testEngineApp')
    .factory('TestService', function ($http, $location) {
        var obj = {
            questions: {},
            questionsWrapper: {"user":null,"questions":null, "quizName":null},
            currentQuestion: {},
            combinedData: {"questions":null, "loginDetails":null},
            currentIndex: 0,
            tl : 0,
            prefferedBehaviour: null, 
            quizName:null
            
/*          testTime: new Date().getTime() + (60000 * 60 * 2)
            testTime: new Date().getTime() + (1000 * 5)*/
        };
        return obj;
    })
    .controller('TestCtrl', function ($scope, TestService, $http, $location, LoginService, LandingService) {

        $http.defaults.useXDomain = true;
        $scope.landingService = LandingService;
        $scope.colorArray = {};
        console.dir("In MainController to request: " + $scope.landingService.currentQuizId);
        console.dir($scope.landingService.currentQuizId);
        $scope.service = TestService;
        $scope.loginService = LoginService;
    	console.dir("***LoginService in about cntrl : "+$scope.loginService);
    	console.dir($scope.loginService);
    	
    	console.dir($scope.service.tl);


    	/*get back detatils*/
    	/*$scope.$watch(
    			function () {
    				return $location.path()
    				},
    			function (newLocation, oldLocation) {
        					$location.newLocation=newLocation;
        					$location.oldLocation=oldLocation;
        					if($scope.actualLocation === newLocation) {
        						alert('Why did you use history back?');
        					}
        					else{
        						// abcdefghijklmnopqrstuvwxyz
        					}
    					}
    	);*/
    	
    	$scope.submitTest = function(){
    	
    		var isTestCompleted = confirm("Do you really want to submit the test !!!");
    		console.dir(isTestCompleted);
			if (isTestCompleted == true) {
				$scope.submitData();
			}
			else {
				$location.path("/test");
			}
    	}



			$scope.$on('$locationChangeSuccess', function(abc, newLocation, oldLocation) {
				/*console.dir($location);
				console.dir(abc);

				console.dir(oldLocation);
				console.dir(typeof(newLocation));
				console.dir(newLocation);*/

				var oldL = oldLocation.slice(oldLocation.indexOf('#')+1);
				var newL = newLocation.slice(newLocation.indexOf('#')+1);

				console.dir(oldL);
				console.dir(newL);

/*
				if(oldL=="/test" && newL!="/report"){
					var isTestCompleted = confirm("Do you really want to submit the test !!!");
					if (isTestCompleted == true) {
						$scope.submitData();
					}
					else {
//						alert("You can continue...");
						$location.path("/test");
					}
				}
				else if(oldL=="/test" && newL=="/report"){
					$scope.submitData();
				}
				else if(oldL=="/instruction" && newL=="/test"){
					$location.path("/test");
				}
				else{
					$location.path("/");
				}
				*/
				if(oldL=="/test" && newL!="/report"){
					$scope.submitTest();
				}
				else if(oldL=="/test" && newL=="/report"){
					$scope.submitData();
				}
				else if(oldL=="/instruction" && newL=="/test"){
					$location.path("/test");
				}
				else{
					$location.path("/");
				}
			});



       /*get back detatils*/

/*
        if($scope.loginService.loginDetails.user==null)
        {
       		$location.path("/");
        }
       	else
       	{
*/

    	$scope.linkAnchors = function () {
            $('ul.nav a').click(function (){
                var path = $(this).attr('href');
                if (path != '#') {
                    window.location = path;
                }
            });
        };

        $scope.callbackTimer={};
        $scope.callbackTimer.status='Running';
        $scope.callbackTimer.callbackCount=0;
        $scope.callbackTimer.finished=function(){
            $scope.callbackTimer.status='COMPLETE!!';
            $scope.callbackTimer.callbackCount++;
            $scope.submitData();
            $scope.$apply();
        };

/*
        $scope.loadData= function (quizId) {
        	console.dir("In MainController LoadData: " + $scope.landingService.currentQuizId);
            $http({
                method: 'GET',
                url: 'TestApp' + '?quizId=' + quizId
            }).success(function (data, status, headers, config) {
                console.dir("Data Fetched Suessfully");
                console.dir(status);
                console.dir(data);
                console.dir(config);
                $scope.service.questions = data;
                console.dir($scope.service.questions);
                console.dir("++++++++++++++++++++++++++");
//                alert("Total number of questions : "+$scope.service.questions.length);
                $scope.service.currentQuestion =  $scope.service.questions[ $scope.service.currentIndex];
                $location.path("/test");

            }).error(function (data, status, headers, config) {
                console.dir("Error Fetching Data");
                console.dir(status);
                console.dir(data);
            });
        }*/


        $scope.submitData= function () {
/*        	$scope.service.combinedData.questions =  $scope.service.questions;
        	$scope.service.combinedData.loginDetails =  $scope.loginService.loginDetails;
*/
        	console.dir("LoginService : "+$scope.loginService);
        	console.dir("LoginService details : "+$scope.loginService.loginDetails);
        	
        	$scope.service.questionsWrapper.questions = $scope.service.questions;
        	$scope.service.questionsWrapper.user = $scope.loginService.loginDetails.user;
        	$scope.service.questionsWrapper.prefferedBehaviour = $scope.service.prefferedBehaviour;
        	$scope.service.questionsWrapper.quizName = $scope.service.quizName;



        	console.log('Combined: ' + $scope.service.questionsWrapper );
        	console.log( $scope.service.questionsWrapper );
        	console.log("User from QuestionWrapper**********************************");
        	console.log($scope.service.questionsWrapper);
        	console.log($scope.service.prefferedBehaviour);
        	console.log($scope.service.quizName);


            $http({
                method: 'POST',
//                quizId: $scope.landingService.currentQuizId,
                data: $scope.service.questionsWrapper,
//              url: 'dummy/report.json'
//                url: '/TestApp' + '?quizId=' + $scope.landingService.currentQuizId
//              url: '/TKHTS/TestApp' + '?quizId=' + $scope.landingService.currentQuizId + '&prefferedBehaviour'
                url: '/TKHTS/TestApp' + '?quizId=' + $scope.landingService.currentQuizId + '&prefferedBehaviour='+ $scope.service.prefferedBehaviour
            }).success(function (data, status, headers, config) {
                console.dir("Data Fetched Successfully");
                console.dir(status);
                console.dir(data);
                console.dir(config);
                $scope.service.questions = data;
                $location.path("/report");
            }).error(function (data, status, headers, config) {
                console.dir("Error Fetching Data");
                console.dir(status);
                console.dir(data);
            });
        };


        for(var i =0; i<$scope.service.questions.length;i++){
        	$scope.service.questions[i].btnColor = "btn btn-primary btn-circle pull-left";
        	console.dir(i+" - " +$scope.service.questions[i].colorArray);
        }


        $scope.attempt = function(currentIndex){
        	for (var key in $scope.service.currentQuestion.answers) {
         	   var obj = $scope.service.currentQuestion.answers[key];
         	   console.dir(obj)
         	   if(obj == true){
         		   console.dir('Do Something');
         		   $scope.service.questions[currentIndex].btnColor = "btn btn-success btn-circle pull-left";
         	   }
         	   else{
          		  $scope.service.questions[currentIndex].btnColor = "btn btn-primary btn-circle pull-left";
         	   }
         	}
        };

        $scope.nextQuestion= function () {
            // alert(++$scope.currentIndex);
        	$scope.attempt($scope.service.currentIndex);
            $scope.service.currentQuestion = $scope.service.questions[++$scope.service.currentIndex];
        };
        $scope.previousQuestion= function () {
        	$scope.attempt($scope.service.currentIndex);
            $scope.service.currentQuestion = $scope.service.questions[--$scope.service.currentIndex];
        };

        $scope.goToQuestion = function (index) {
        	$scope.attempt($scope.service.currentIndex);
        	console.dir('Index changing to :' + index);
            $scope.service.currentQuestion = $scope.service.questions[index];
            $scope.service.currentIndex = index;
            console.dir($scope.service.currentQuestion.answers);
        };



//       	}
    });