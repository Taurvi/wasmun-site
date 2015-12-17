var ngApp = angular.module('ngApp', ['ui.router']);

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
        .state('conferenceInfo', {
            url: '/conference-info',
            views: {
                'content': {
                    templateUrl: 'js/views/conference-info.html',
                    controller: ''
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});