'use strict';

/**
 * @ngdoc function
 * @name testEngineApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the testEngineApp
 */

angular.module('authApp')

    .config(['FacebookProvider', function(FacebookProvider) {
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


//  .controller('FbLoginCtrl', function ($scope, LoginService, $http, $location, MsgService, localStorageService, ErrMsgService) {
  .controller('FbLoginCtrl', function ($scope, LoginService, $http, $location, localStorageService, Facebook) {

        $http.defaults.useXDomain = true;
    $scope.loginService = LoginService;
        console.log('22222222');
        //console.log(FacebookService);

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
        url: 'dummy/authentication.json',
        //url: '/AuthenticationApp',
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
              LoginService.loginDetails.authenticated = true;
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
            	 /*var isLoginPage = previousPath.slice(previousPath.indexOf('#')+1) == "/login";
                 console.log(previousPath);
                 console.dir(isLoginPage);
            	if(isLoginPage === true){
            		$location.path("/login-success");
            	}
            	else{
            		window.location.replace(previousPath);
            	}*/

                 var isLoginPage = previousPath.slice(previousPath.lastIndexOf('/')) == '/login';
                 console.log(isLoginPage);
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



        /*facebook-login-code*/

        // Define user empty data :/
        $scope.user = {};

        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        var isUserConnected = false;

        Facebook.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                isUserConnected = true;
            }
        });

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function() {
            if(!isUserConnected) {
                $scope.login();
            }

        };

        /**
         * Login
         */
        $scope.login = function() {
            // asynchronous call for facebook login
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    console.log(response);
                    $scope.logged = true;

                    console.log('hit db');
                    console.log($scope.user);

                }
            });
        };

        /**
         * me
         */
        $scope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function() {
                    $scope.user = response;
                    console.log($scope.user);
                });

                //hit db but check if authentication is false otherwise skip this
                console.log($scope.loginService.loginDetails);
                if(!$scope.loginService.loginDetails.authenticated) {
                    console.log('get registration');
                    /*                $scope.loginService.loginDetails.userName = "guest";
                     $scope.loginService.loginDetails.password = "guest";

                     $scope.submitData();*/
                }

            });
        };

        /**
         * Logout
         */
        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.user         = {};
                    $scope.logged = false;
                });
            });
        }

        /**
         * Taking approach of Events :D
         */
        $scope.$on('Facebook:statusChange', function(ev, data) {
            console.log('Status: ', data);


            if (data.status == 'connected') {

                // get user details
                $scope.me();
                $scope.logged = true;


                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.byebye     = false;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.byebye     = true;
                });
            }



        });

        /*facebook-login-code*/


    });

