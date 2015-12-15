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

        });

    $urlRouterProvider.otherwise('/');
});