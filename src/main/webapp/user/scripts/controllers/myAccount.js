'use strict';

angular.module('authApp')
.factory('AssessmentService', function ($http, $location) {
        var obj = {
                reports : [],
                path : null
        }
        return obj;
    })

.controller('MyAccountCtrl', function($scope, LoginService, $http, $location, localStorageService, AssessmentService) {

			$http.defaults.useXDomain = true;
			$scope.loginService = LoginService;
			console.log('22222222');
			$scope.assessmentService = AssessmentService;

			$scope.localStorageService = localStorageService;
			$scope.loginService.loginDetails = localStorageService.get('loginDetails');
			console.log($scope.loginService.loginDetails);
			// $scope.loginService.loginDetails.user.isSocialUser = 'Y'
			


			$scope.getPdfLinks = function() {
				$http({
					method : 'GET',
					url : '/TKHTS/AccountApp?kht='+$scope.loginService.loginDetails.user.kht
//					data : $scope.loginService.loginDetails.user
				}).success(function(data, status, headers, config) {
					console.log("data from AccountApp");
					$scope.assessmentService = data;
					console.dir($scope.assessmentService);
				}).error(function(data, status, headers, config){
					console.log("some error on server");
				});
			}

			$scope.getPdfLinks();
			
			$scope.submitData = function() {};

		});
