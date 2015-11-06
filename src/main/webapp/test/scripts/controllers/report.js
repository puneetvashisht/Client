'use strict';

/**
 * @ngdoc function
 * @name testEngineApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the testEngineApp
 */

angular.module('testEngineApp').controller('ReportCtrl',
		function($scope,  $location, LoginService, TestService, localStorageService) {
			$scope.loginService = LoginService;
			$scope.service = TestService;
			
			$scope.totalScore = 0;
			$scope.totalMarks = $scope.service.questions.length;
			
			localStorageService.remove('previousPath');
			
			console.log("---------+++++++++++////////******************************");
			console.log($scope.service.prefferedBehaviour);
			console.log(typeof($scope.service.prefferedBehaviour));
			
			for(var i =0; i<$scope.service.questions.length;i++){
				$scope.totalScore += $scope.service.questions[i].score;
	        }
			
			console.log("total score");
			console.log($scope.totalScore);
			
			if ($scope.loginService.loginDetails.user == null) {
				$location.path("/");
			} else {
				$scope.service = TestService;
			}
			
			
			// disbale back button here
			$scope.$on('$locationChangeSuccess', function(abc, newLocation, oldLocation) {

				var oldL = oldLocation.slice(oldLocation.indexOf('#')+1);
				var newL = newLocation.slice(newLocation.indexOf('#')+1);

				if(oldL=="/report"){
					if(newL=="/test" || newL=="/instruction"){
						$location.path("/report");
					}
				}
			});
			
			
		});
