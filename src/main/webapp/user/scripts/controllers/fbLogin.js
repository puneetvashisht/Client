'use strict';

angular.module('authApp')

    .config(['FacebookProvider', function (FacebookProvider) {
        var myAppId = '753026724728467';

        // You can set appId with setApp method
        // FacebookProvider.setAppId('myAppId');

        /**
         * After setting appId you need to initialize the module.
         * You can pass the appId on the init method as a shortcut too.
         */
        FacebookProvider.init(myAppId);
    }
    ])


    .controller('FbLoginCtrl', function ($scope, LoginService, $http, $location, $route, localStorageService, Facebook) {

        $http.defaults.useXDomain = true;
        $scope.loginService = LoginService;
        console.log('22222222');

        console.dir($scope.loginService);
        console.dir("LoginService in login cntrl " + $scope.loginService);
        console.dir($scope.loginService);


        $scope.localStorageService = localStorageService;

        $scope.submitData = function () {
        	if(!$scope.loginService.loginDetails.password){
        		return;
        	}

            console.dir($scope.loginService.loginDetails);
            $http({
                method: 'POST',
                //url: 'dummy/authentication.json',
//                url: '/AuthenticationApp',
                url: '/TKHTS/AuthenticationApp',
                data: $scope.loginService.loginDetails
            }).success(function (data, status, headers, config) {
                console.dir("Data Fetched Successfully");
                console.dir(status);
                console.dir(data);
                console.dir(config);
                $scope.loginService.loginDetails = data;
                
                console.dir("User***************");
                console.dir($scope.loginService.loginDetails);

                if (!!$scope.loginService.loginDetails.user) {
                    console.dir("User *********************************");
                    console.dir($scope.loginService.loginDetails.user);
                    console.dir("user coming from the server is : " + $scope.loginService.loginDetails);
                    if ($scope.loginService.loginDetails.user.authenticated && $scope.loginService.loginDetails.user.isSocialUser === 'N') {
                        console.dir("store in sessionStorage");
                        localStorageService.set('loginDetails', JSON.stringify(data));
                        LoginService.loginDetails.authenticated = true;

//                        $location.path("/login-success");
                        $location.path("/myAccount");
                    }
                    else if($scope.loginService.loginDetails.user.isSocialUser === 'Y'){
                        $scope.errorMessage = 'Use facebook or gmail Sign in';
                        $scope.loginService.loginDetails.password = null;
                    }
                    else{
                        $scope.errorMessage = 'Wrong username/password';
                        $scope.loginService.loginDetails.password = null;
                    }
                }
                else if (!$scope.loginService.loginDetails.user && $scope.isFbUser) {
                    $scope.loginService.loginDetails.password = null;
                    $scope.getTkRegister();
                }
                    else{
                        $scope.errorMessage = 'Wrong username/password';

                        $scope.loginService.loginDetails.password = '';
                }
                console.dir("Error Msg: " + $scope.errorMessage);

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


        /*facebook-login-code*/

        // Define user empty data :/
        $scope.user = {};

        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;
        $scope.isFbUser = false;

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function () {
                return Facebook.isReady();
            },
            function (newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        var isUserConnected = false;

        Facebook.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                isUserConnected = true;
            }
        });

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function () {
            if (!isUserConnected) {
                $scope.login();
            }
        };

        /**
         * Login
         */
        $scope.login = function () {
            $scope.isFbUser = true;

            // asynchronous call for facebook login
            Facebook.login(function (response) {
                if (response.status == 'connected') {
                    console.log(response);
                    $scope.logged = true;


                }
            });
        };

        /**
         * me
         */
        $scope.me = function () {
            Facebook.api('/me', function (response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function () {
                    $scope.user = response;
                    console.log($scope.user);


                    console.log('get registration');
                    $scope.getFbLogin($scope.isFbUser);

                });
            });
        };

        /**
         * Logout
         */
        $scope.fbLogout = function () {
            Facebook.logout(function () {
                $scope.$apply(function () {
                    $scope.user = {};
                    $scope.logged = false;
                    $scope.isFbUser = false;
                });
                $route.reload();
            });
        }

        /**
         * Taking approach of Events :D
         */
        $scope.$on('Facebook:statusChange', function (ev, data) {
            console.log('Status: ', data);


            if (data.status == 'connected') {

                // get user details
                $scope.me();
                $scope.logged = true;


                $scope.$apply(function () {
                    $scope.salutation = true;
                    $scope.byebye = false;
                });
            } else {
                $scope.$apply(function () {
                    $scope.salutation = false;
                    $scope.byebye = true;
                });
            }
        });

        /*facebook-login-code*/


        /*get registered*/

        $scope.getTkLogin = function () {
            $scope.loginService.loginDetails.userName = $scope.user.email;
            $scope.loginService.loginDetails.password = $scope.user.id;

            $scope.submitData();

        };

        $scope.getTkRegister = function () {
            console.log("In tk register");

            if ($scope.user.email) {
                $scope.user.isFbUser = $scope.isFbUser;
                $scope.user.isSocialUser = 'Y';
                localStorageService.set('registrationDetails', $scope.user);

                $location.path("/register");
            }
            else {
                console.log('email is not available from this facebook for : '+$scope.user.name);
                alert('Email-Id is not available from this account. Get TKHTS registration');
                //$scope.fbLogout();
                $location.path('/register');
            }
        };

        $scope.getFbLogin = function (isFbUser) {
            console.log('In registration  -->  hit database here');
            $scope.isFbUser = isFbUser;
            console.log('$scope.isFbUser : ' + $scope.isFbUser);

            //hit db but check if authentication is false otherwise skip this
            if ($scope.isFbUser) {
                $scope.getTkLogin();
            }
        }

        /*get registered*/


        /* get logged in after facebook registration */
        $scope.fbLoginDetails = localStorageService.get('loginDetails');
        localStorageService.remove('loginDetails');

        if($scope.fbLoginDetails){
            $scope.loginService.loginDetails.userName = $scope.fbLoginDetails.username;
            $scope.loginService.loginDetails.password = $scope.fbLoginDetails.password;

            $scope.submitData();
        }
        /* get logged in after facebook registration */
        
        
    });

