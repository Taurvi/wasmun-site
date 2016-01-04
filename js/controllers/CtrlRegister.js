var ngApp = angular.module('ngApp');

ngApp.animation('.reveal-animation', function() {
    return {
        enter: function(element, done) {
            element.css('display', 'none');
            element.fadeIn(300, done);
            return function() {
                element.stop();
            }
        },
        leave: function(element, done) {
            element.fadeOut(300, done)
            return function() {
                element.stop();
            }
        }
    }
});

ngApp.controller('CtrlRegister', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.show = false;

    $scope.countryMatrix = [];

    var getMatrix = function() {
        $http({
            method: 'GET',
            url: 'data/matrix.json'
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.countryMatrix = response.data;
        }, function errorCallback(err) {
            console.log(err);
        })
    };

    $scope.getCommitteeSize = function(committeeObj) {
        var counter = 0;

        if (committeeObj.ga4)
            counter++;
        if (committeeObj.ecosoc)
            counter++;
        if (committeeObj.unodc)
            counter++;
        if (committeeObj.hrc)
            counter++;
        if (committeeObj.unep)
            counter++;
        if (committeeObj.icj)
            counter++;

        return counter;
    };

    $scope.calculateDelegateCost = function() {
        if ($scope.ngDelegationSize == null)
            return 0;
        else
            return $scope.ngDelegationSize * 35;
    };

    $scope.selectedMemberStates = [];

    $scope.checkSelectedState = function(name) {
        return $scope.selectedMemberStates.indexOf(name);
    };

    $scope.addMemberState = function(name) {
        var check = $scope.checkSelectedState(name)

        if (check == -1)
            $scope.selectedMemberStates.push(name);
        else
            console.log('err');
    };

    $scope.removeMemberState = function(name) {
        var check = $scope.checkSelectedState(name)
        if (check != -1)
            $scope.selectedMemberStates.splice(check, 1);
        else
            console.log('err');
    };

    getMatrix();
}]);