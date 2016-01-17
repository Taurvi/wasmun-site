var ngApp = angular.module('ngApp');



ngApp.controller('CtrlApply', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.registerData = {};

    $scope.totalSlots = 0;

    socket.on('sendRegData', function(response) {
        console.log(response);
        $scope.registerData = response;
    })


    $scope.getData = function() {
        socket.emit('retrieveRegistration');
    }
}]);