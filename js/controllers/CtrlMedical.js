var ngApp = angular.module('ngApp');

ngApp.controller('CtrlMedical', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $scope.socketConnected = true;
    socket.on('connect_error', function() {
        console.log('socket failed');
        $scope.socketConnected = false;
    });
    socket.on('connect', function() {
        console.log('socket sucesss');
        $scope.socketConnected = true;
        $scope.$apply();
    });

    $scope.show = false;

    $scope.pendingSubmission = false;
    $scope.formSuccess = false;
    $scope.formError = false;

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