var ngApp = angular.module('ngApp');

/*ngApp.animation('.reveal-animation', function() {
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
});*/

ngApp.controller('CtrlMatrix', ['$scope', '$rootScope', 'uiGridConstants', '$http', function($scope, $rootScope, uiGridConstants, $http) {

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

    $scope.matrixOpen = true;

    $scope.countryMatrix = [];
/*    $scope.pendingSubmission = false;
    $scope.formSuccess = false;
    $scope.formError = false;*/

    var getMatrix = function() {
        $http({
            method: 'GET',
            url: 'data/full-matrix.json'
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



    getMatrix();

    $scope.gridOptions = {
        enableFiltering: true,
        enableColumnResizing: true,
        showColumnFooter: true,
        showGridFooter: true,
        data: 'countryMatrix',
        columnDefs: [
            { field: 'country', displayName: 'Country', width: '25%' },
            { field: 'ga4', displayName: 'GA4', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>'},
            { field: 'ecosoc', displayName: 'ECOSOC', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>' },
            { field: 'unodc', displayName: 'UNODC', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>' },
            { field: 'hrc', displayName: 'HRC', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>' },
            { field: 'unep', displayName: 'UNEP', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>' },
            { field: 'icj', displayName: 'ICJ 1', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>' },
            { field: 'icj2', displayName: 'ICJ 2', aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="ui-grid-cell-contents text-center" ng-if="row.entity[col.field]"><span class="text-success"><i class="fa fa-user"></i></span></div>' },
            { field: 'school', displayName: 'School', width: '15%' },
        ]
    };

}]);