import angular from 'angular';
import Idea from '../model/Idea';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

console.log(Snap);

angular.module('miper.controllers', [])
    .controller('AppController', function () {
      this.msg = 'Hello - credentials are admin/admin';
    })
    .controller('MainController', function (restrictedData) {
      this.restrictedData = restrictedData;
    })
    .controller('LoginController', function (AuthService, $state) {
      this.loginErrorVisible = false;
      this.user = {};
      this.login = function () {
        AuthService.login(this.user).then(() => {
          $state.go('main');
        }).catch((error) => {
          this.loginErrorVisible = true;
          console.log(error.reason);
        });
      }
    })
    .controller('WorkbenchController', function (id) {
      this.id = id;

      function updateCallback () {
        console.log('updated!');
      }

      const s = Snap("#main");
      let p1 = new Idea(s, undefined, 500, 100, updateCallback);
    });

export default angular.module('miper.controllers');
