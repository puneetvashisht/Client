angular.module('feedbackApp')

  .factory('FeedbackService', function () {
    var obj = {
      feedbackDetails: {
        "name": null,
        "email": null,
        "contact": null,
        "experience": null,
        "feedback": null,
        "rate": null
      }
    };
    return obj;
  })

  .controller('FeedbackCtrl', function ($scope, FeedbackService, $http, $location, localStorageService) {
    $http.defaults.useXDomain = true;

    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

//    $scope.successMessage = "";

    $scope.hoveringOver = function (value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.feedbackService = FeedbackService;
    console.log("FeedbackService in Feedback ctrl" + FeedbackService);



    $scope.getUserInfo = function(){
    	var userId = localStorageService.get('loginDetails').user.kht;
    	console.log(userId);
    	
    	$.ajax({
            type: "GET",
//            url: '../../dummy/feedback.json',
//            url: "/FeedbackApp?userId="+userId,
            url: "/TKHTS/FeedbackApp?userId="+userId,
            success: function ( data, status, headers) {
            	console.log("data from server")
            	console.log(data);
            	console.log(status);
            	console.log(headers);
            	console.log($scope.feedbackService.feedbackDetails);
            	
            	localStorageService.set('feedbackUserDetails', JSON.stringify(data));
            	$scope.feedbackService.feedbackDetails.name = data.userName;
            	$scope.feedbackService.feedbackDetails.email = data.email;
            	$scope.feedbackService.feedbackDetails.contact = data.contact;
            	console.log($scope.feedbackService.feedbackDetails);
            },
            error: function (data, status, headers, config) {
                console.log("Error in getting user info");
                console.log(status);
                console.log(data);
              }

        }); // Ajax close
    }

    	$scope.getUserInfo();



    $scope.submitData = function () {

      if ($scope.feedbackService.feedbackDetails) {
        console.log($scope.feedbackService.feedbackDetails);
        $http(
          {
            method: 'POST',
//            url: 'dummy/feedback.json',
//            url: '/TKHTS/FeedbackApp',
            url: '/TKHTS/FeedbackApp',
            data: $scope.feedbackService.feedbackDetails
          })
          .success(function (data, status, headers, config) {
            /*console.log("Feedback Entered Successfully");*/
            console.log(status);
            console.log(data);
            console.log(config);
            console.log($scope.feedbackService.feedbackDetails.feedback);
            if (data.feedback) {
              console.log("Feedback Entered Successfully");
              //$scope.message = data.successMessage;
                $scope.message = 'Thank you for your valuable feedback!!';
              console.log($scope.message);

/*//              $scope.feedbackService.feedbackDetails = null;
              delete $scope.feedbackService.feedbackDetails.rate;
              $scope.feedbackService.feedbackDetails.feedback = "";*/
              localStorageService.remove('feedbackUserDetails');
              
              window.location.replace("http://localhost:8080/TKHTS/");

            }
           else {
             //$scope.message = data.errorMessage;
                $scope.message = 'Some error occurred, Please visit again!!';
             console.log($scope.message);
             }

          })
          .error(function (data, status, headers, config) {
            console.log("Error Entering Feedback");
            console.log(status);
            console.log(data);
          });
      }

    };

  });