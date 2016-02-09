import angular from 'angular';
import './app/miper.app';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['miper.app']);
});