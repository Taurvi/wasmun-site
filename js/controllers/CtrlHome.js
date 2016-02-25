var ngApp = angular.module('ngApp');

ngApp.controller('CtrlHome', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.test2 = 'testing success';

    var startConference = moment([2016, 2, 5, 9, 00, 00, 000]);
    var now = moment();
    $scope.countdownTime = startConference.unix() - now.unix()
}]);