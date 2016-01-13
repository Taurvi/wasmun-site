var ngApp = angular.module('ngApp');

var socket = io('http://localhost:3000');

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

ngApp.controller('CtrlRegister', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.show = false;

    $scope.matrixOpen = true;

    $scope.countryMatrix = [];
    $scope.pendingSubmission = false;
    $scope.formSuccess = false;
    $scope.formError = false;

    var getMatrix = function() {
        $http({
            method: 'GET',
            url: 'data/matrix.json'
        }).then(function successCallback(response) {
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
        if (committeeObj.icj2)
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

    $scope.prepareData = function() {
        $scope.pendingSubmission = true;
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.formRegistration.$invalid) {
            console.log('failed');
            return;
        }

        var objSchoolInfo = {
            name: $scope.ngSchoolName,
            address: $scope.ngSchoolAddress,
            address2: $scope.ngSchoolAddress2,
            city: $scope.ngSchoolCity,
            state: $scope.ngSchoolState,
            zipcode: $scope.ngSchoolZipCode
        };

        var objAdvisorInfo = {
            name: $scope.ngAdvisorName,
            email: $scope.ngAdvisorEmail,
            phone: $scope.ngAdvisorPhone
        };

        var objHdInfo = {
            name: $scope.ngHdName,
            email: $scope.ngHdEmail
        };

        var objHd2Info = {
            name: $scope.ngHdName2,
            email: $scope.ngHdEmail2
        };

        var objDelegationInfo = {
            size: $scope.ngDelegationSize,
            requests: $scope.selectedMemberStates
        };

        var dataPackage = {
            schoolInfo: objSchoolInfo,
            advisorInfo: objAdvisorInfo,
            hdInfo: objHdInfo,
            hdInfo2: objHd2Info,
            delegateInfo: objDelegationInfo
        };
        socket.emit('registerSchool', dataPackage);
    };

    socket.on('registerSuccess', function(data) {
        console.log('success', data);
        $scope.formSuccess = true;
        console.log($scope.formSuccess);
        $scope.$apply();
    });

    socket.on('registerError', function(err) {
        console.log('failed');
        $scope.formError = true;
        $scope.$apply();
    })
}]);