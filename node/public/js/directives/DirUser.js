var ngApp = angular.module('ngApp');

ngApp.directive('dirUser', function() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        scope: {
            value: '=ngModel'
        },
        require: 'ngModel',
        // which markup this directive generates
        templateUrl: 'js/templates/user.tpl.html',
        link: function(scope, iElement, iAttrs, ngModelController) {
            ngModelController.$render = function() {
                iElement.find('div').text(ngModelController.$viewValue);
            };
        }
    };
});