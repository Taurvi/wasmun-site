var ngApp = angular.module('ngApp');
ngApp.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])
ngApp.controller('CtrlLocation', ['$scope', '$http', '$state', function($scope, $http, $state) {
    var base = 'http://uw.edu/maps/?'
    $scope.location = base + 'LNDMK-1';

    $scope.setLocation = function(code) {
        $scope.location = base + code;
    }
}]);