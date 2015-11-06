angular.module('authApp')

		.factory('RegistrationService', function() {
			var obj = {
					registrationDetails : {
						"username" : null,
						"email" : null,
						"password" : null,
						"confirmPassword" : null,
						"contact" : null
					},
/*					registrationDetails : {
						"username" : null,
						"email" : null,
						"password" : null,
						"confirmPassword" : null,
						"contact" : null,
						"gender" : null,
						"dob" : null,
						"experience" : null
					},
*/				isRegistered: false
			};
			return obj;
		})
/*.factory('IsRegisteredService', function () {
			var obj = {
					isRegistered: false
			};
			return obj;
		})
*/		.controller('RegisterCtrl', function($scope, RegistrationService, $http, $location) {
					$http.defaults.useXDomain = true;
					
					
					$scope.RegistrationService = RegistrationService;
					console.log("RegistrationService in Registration cntrl" + $scope.RegistrationService);
					console.log("***********--------------************");
					console.log($scope.RegistrationService.isRegistered);

					$scope.validateData = function() {
						$(".error").hide();
						var hasError = false;

						var nameVal = $("#username").val();

						if (nameVal == "") {
							$("#username")
								.after("<span class='error'>Enter your name!</span>");
							hasError = true;
						} else if (!isNaN(nameVal.charAt(0))) {
							$("#username")
								.after("<span class='error'>First character can not be number!</span>");
							hasError = true;
						}

						else if (nameVal.length < 6) {
							$("#username")
								.after("<span class='error'>Minimum number of characters 6!</span>");
							hasError = true;
						}

						else if (nameVal.length > 15) {
							$("#username")
								.after("<span class='error'>Maxmimum number of characters 15!</span>");
							hasError = true;
						}

						else if (nameVal.length < 6) {
							$("#username").after("<span class='error'>Too small</span>");
							hasError = true;
						}

						var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
						var emailaddressVal = $("#email").val();
						if (emailaddressVal == '') {
							$("#email")
								.after('<span class="error">Please enter your email address.</span>');
							hasError = true;
						}

						else if (!emailReg.test(emailaddressVal)) {
							$("#email")
								.after('<span class="error">Enter a valid email address.</span>');
							hasError = true;
						}

						var pwdReg = /^((?=.*\d)(?=.*[a-z]).{6,15})?$/;
						var pwdVal = $("#password").val();
						if (pwdVal == "") {
							$("#password")
								.after('<span class="error">Enter a valid Password.</span>');
							hasError = true;
						} else if (!pwdReg.test(pwdVal)) {
							$("#password")
								.after('<span class="error">6 to 15 character, one lower case letter, and one digit</span>');
							hasError = true;
						}

						var cnfrmPwdVal = $("#confirmPassword").val();
						if (cnfrmPwdVal == "") {
							$("#confirmPassword")
									.after('<span class="error">Enter a Password again.</span>');
							hasError = true;
						} else if (cnfrmPwdVal != pwdVal) {
							$("#confirmPassword")
									.after('<span class="error">Password is not matched</span>');
							hasError = true;
						}

						var contacVal = $("#contact").val();
						if (contacVal == "") {
							$("#contact")
									.after('<span class="error">Contact number can be blank!</span>');
							hasError = true;
						} else if (isNaN(contacVal)) {
							$("#contact")
									.after('<span class="error">Only digit are required!</span>');
							hasError = true;
						} else if (contacVal.length < 10) {
							$("#contact")
									.after('<span class="error">Minimum 10 digits required!</span>');
							hasError = true;
						} else if (contacVal.length > 15) {
							$("#contact")
									.after('<span class="error">Maximum 15 digits required!</span>');
							hasError = true;
						}
/*
						var genderVal = $("input[name=gender]:checked").val();
						if (genderVal == undefined) {
							$("#genderMsg")
									.after("<span class='error'>Gender is not selected!</span>");
							hasError = true;
						}

						var dobVal = $("#dob").val();
						if (dobVal == "") {
							$("#dob")
									.after('<span class="error">Date of birth is not selected!</span>');
							hasError = true;
						}
						
*/
						return !hasError;
					}
					
					
					$scope.submitData = function() {
						var validateResult = $scope.validateData();
						console.log('Validate Result' + validateResult);


						var ajaxUrl = '/RegisterApp';

/*
						var ajaxUrl = './dummy/register.json';
						validateResult = true;
*/


						if (validateResult) {
							console.log($scope.RegistrationService.registrationDetails);
							$http(
									{
										method : 'POST',
										url : ajaxUrl,
										data : $scope.RegistrationService.registrationDetails
									})
									.success(function(data, status, headers,config) {
												console.log("Data Fetched Successfully");
												console.log(status);
												console.log(data);
												console.log(config);
												console.log($scope.RegistrationService.registrationDetails.register);
												if (data.register === true) {
													console.log("User Registered Successfully");

													$scope.message = data.successMessage;
													console.log("Msg ++++++ " +$scope.message);
													$scope.RegistrationService.isRegistered = data.register;
//													console.log($scope.isRegisteredService.isRegistered);
													$location.path("/reg-success");

												} else {
													$scope.message = data.errorMessage;
													console.log($scope.message);
													console.log($scope.RegistrationService.registrationDetails);
												}

											})
									.error(function(data, status, headers,config) {
												console.log("Error Fetching Data");
												console.log(status);
												console.log(data);
											});
						}

					};

				});
