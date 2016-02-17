import angular from 'angular';

const BACKEND = 'http://localhost:3470';
const AUTH = 'http://localhost:3471';

angular.module('miper.services', [])
    .service('LocalStorageService', function ($window) {
      this.set = function (key, value) {
        $window.localStorage.setItem(key, JSON.stringify(value));
      };

      this.get = function (key) {
        return JSON.parse($window.localStorage.getItem(key)) || {};
      };
    })
    .service('AuthService', function ($http, $q, LocalStorageService) {
      this.login = function (user) {
        return $http.post(`${AUTH}/auth`, user).then(function (res) {
          window.console.log(res);
          user.token = res.data.token;
          user.authenticated = true;
          LocalStorageService.set('user', user);
          return $q.when();
        }).catch(function () {
          window.console.log('invalid credentials!');
          return $q.reject({reason: 'invalid credentials'});
        });
      };

      this.getUserInfo = function () {
        return LocalStorageService.get('user');
      };
    })
    .service('RestrictedDataService', function ($http) {
      this.getRestrictedData = function () {
        return $http.get(`${BACKEND}/api/restricted`).then(function (res) {
          return res.data;
        });
      };
    })
    .factory('AuthInterceptor', function (LocalStorageService, $q, $injector) {
      return {
        request: function (config) {
          config.header = config.headers || {};
          if (LocalStorageService.get('user').token) {
            config.headers.Authorization = 'Bearer ' + LocalStorageService.get('user').token;
          }
          return config;
        },
        responseError: function (response) {
          //this is for the case when user is no longer authenticated - his token might have expired
          if (response.status === 401) {
            console.log('user not authenticated! the token might have expired!');
            $injector.get('$state').go('login');
          }
          return $q.reject(response);
        }
      };
    });

export default angular.module('miper.services');
