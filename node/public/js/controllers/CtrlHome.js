var ngApp = angular.module('ngApp');

ngApp.controller('CtrlHome', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.test2 = 'testing success';
}]);