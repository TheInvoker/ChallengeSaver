'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
 angular
 .module('yapp', [
    'ui.router',
    'snap',
    'ngAnimate'
    ])
 .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
    })
    .state('login', {
      url: '/login',
      parent: 'base',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      parent: 'base',
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/overview.html'
    })
    .state('reports', {
        url: '/reports',
        parent: 'dashboard',
        templateUrl: 'views/dashboard/reports.html'
    })
    .state('join', {
        url: '/join',
        parent: 'dashboard',
        controller: 'JoinCtrl',
        templateUrl: 'views/dashboard/join.html'
    })
        .state('connectaccounts', {
            url: '/connectaccounts',
            parent: 'base',
            controller: 'ConnectaccountsCtrl',
            templateUrl: 'views/dashboard/connectaccounts.html'
        })
   
});
