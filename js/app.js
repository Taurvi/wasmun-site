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
        .state('secretariat', {
            url: '/secretariat',
            views: {
                'content': {
                    templateUrl: 'js/views/secretariat.html',
                    controller: 'CtrlSecretariat'
                }
            }
        })
        .state('conferenceInfo', {
            url: '/conference-info',
            views: {
                'content': {
                    templateUrl: 'js/views/conference-info.html',
                    controller: 'CtrlConfInfo'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});