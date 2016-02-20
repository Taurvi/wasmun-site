var socket = io('http://localhost:8080');
var ngApp = angular.module('ngApp', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.showErrors', 'ngAnimate']);

ngApp.config(['showErrorsConfigProvider', function(showErrorsConfigProvider) {
    showErrorsConfigProvider.showSuccess(true);
}]);

ngApp.config(function($stateProvider, $urlRouterProvider) {
    // Strict Mode
    'use strict';
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'js/views/home.html',
                    controller: 'CtrlHome'
                }
            }
        })
        .state('about', {
            url: '/about',
            views: {
                'content': {
                    templateUrl: 'js/views/about.html',
                    controller: ''
                }
            }
        })
        .state('secretariat', {
            url: '/secretariat',
            views: {
                'content': {
                    templateUrl: 'js/views/secretariat.html',
                    controller: ''
                }
            }
        })
        .state('staff', {
            url: '/staff',
            views: {
                'content': {
                    templateUrl: 'js/views/staff.html',
                    controller: ''
                }
            }
        })
        .state('apply', {
            url: '/apply',
            views: {
                'content': {
                    templateUrl: 'js/views/apply.html',
                    controller: 'CtrlApply'
                }
            }
        })
        .state('conferenceInfo', {
            url: '/conference-info',
            views: {
                'content': {
                    templateUrl: 'js/views/conference-info.html',
                    controller: ''
                }
            }
        })
        .state('matrix', {
            url: '/matrix',
            views: {
                'content': {
                    templateUrl: 'js/views/matrix.html',
                    controller: 'MatrixController'
                }
            }
        })
        .state('conferenceSpeaker', {
            url: '/conference-speaker',
            views: {
                'content': {
                    templateUrl: 'js/views/conference-speaker.html',
                    controller: ''
                }
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'content': {
                    templateUrl: 'js/views/registration.html',
                    controller: 'CtrlRegister'
                }
            }
        });

    $urlRouterProvider.otherwise('/');


});