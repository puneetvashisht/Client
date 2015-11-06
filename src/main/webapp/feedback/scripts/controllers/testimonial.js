angular.module('feedbackApp')


    .controller('TestimCtrl', function ($scope) {
        $scope.feedbacks = [{
            imgUrl: 'emptyUser.png',
            userName: 'Sneha Gupta',
            companyName: '',
            text: 'thkts.com is a great website in order to learn basic concepts in a technology from the scratch. The pattern and the content are near to perfect for a person to understand the topic. At least for me its really helpful and i want to credit you guys for make it worth the effort.'
        },
            {
                imgUrl: 'emptyUser.png',
                userName: 'Reetika Goyal',
                companyName: 'NIIT Technologies',
                text: 'It was really effective lecture. If you want to learn fast and every little concept, I recommend you to train with TKHTS'
            },
            {
                imgUrl: 'emptyUser.png',
                userName: 'Ashwani Bansal',
                companyName: 'NIIT Technologies',
                text: 'This training showed how a professional course is different from college lectures'
            }]
    });