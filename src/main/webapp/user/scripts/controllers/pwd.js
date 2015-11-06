'use strict';

angular.module('authApp')

.controller('PwdCtrl', function($scope, $http, LoginService) {
	$http.defaults.useXDomain = true;
	$scope.loginService = LoginService;
	console.log($scope.loginService);
	
	$scope.isMailSent = false;

	/*
	 * $scope.email = "root@localhost"; $scope.currentPassword = "abc";
	 * $scope.newPassword = "xyz"; $scope.confirmPassword = "xyzs";
	 * $scope.errorMsg = "error";
	 */

	$scope.getMyPassword = function() {
		console.log($scope.email);
//		$scope.loginService.loginDetails.email = $scope.email;
		
		console.log($scope.loginService.loginDetails);
			$http({
				method : 'GET',
				// url: 'dummy/password.json',
				url : '/TKHTS/PasswordApp?email=' + $scope.email
			}).success(function(data, status, headers, config) {
				console.log(data);
				$scope.loginService.loginDetails = data;
				console.log($scope.loginService);
				console.log("66666666666");
				$scope.isMailSent = $scope.loginService.loginDetails.isMailSent;
			}).error(function(data, status, headers, config) {
				console.log("Some error occurred on the server");
			});
	}

	$scope.getPassword = function() {
		if ($scope.newPassword === $scope.confirmPassword) {
			console.log("Same");
			$scope.errorMsg = "";
			var pwdDetails = {};
			pwdDetails.email = $scope.email;
			pwdDetails.currentPassword = $scope.currentPassword;
			pwdDetails.newPassword = $scope.newPassword;
			pwdDetails.kht = $scope.loginService.loginDetails.user.kht;
			console.log(pwdDetails);

			$http({
				method : 'POST',
				// url: 'dummy/password.json',
				// url:
				// '/TKHTS/PasswordApp?email='+$scope.email+'&pwd='+$scope.password+'&kht='+kht,
				url : '/TKHTS/PasswordApp',
				data : pwdDetails
			}).success(function(data, status, headers, config) {
				console.log(data);
				if (data.password) {
					console.log("Password is sent to " + $scope.email);
				} else {
					console.log($scope.email + " is not found in database.");
				}
			}).error(function(data, status, headers, config) {
				console.log("Some error occurred on the server");
			});

		} else {
			console.log("not same");
			$scope.errorMsg = "passwords not matched";
		}

	};

});