import angular from 'angular';
import 'angular-ui-router';
import './services/miper.services';
import './controllers/miper.controllers';
import STATE_LOGIN from './states/state-login';
import STATE_MAIN from './states/state-main';
import STATE_WORKBENCH from './states/state-workbench';

angular.module('miper.app', ['ui.router', 'miper.services', 'miper.controllers'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $stateProvider
          .state('main', STATE_MAIN)
          .state('login', STATE_LOGIN)
          .state('workbench', STATE_WORKBENCH);
      $urlRouterProvider.otherwise('/');

      $httpProvider.interceptors.push('AuthInterceptor');
    })
    .run(function ($rootScope, $location, $state, AuthService) {
      $rootScope.$on('$stateChangeStart', function (e, toState /*, toParams, fromState, fromParams*/) {
        if (toState.name === 'login') {
          return;
        }

        if (!AuthService.getUserInfo().authenticated) {
          window.console.log('not logged in!');
          e.preventDefault();
          $state.go('login');
        }
      });
    });

export default angular.module('miper.app');
