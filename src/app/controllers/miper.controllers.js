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
      let p2 = new Idea(s, p1, 450, 150, updateCallback);
      let p3 = new Idea(s, p1, 550, 150, updateCallback);
      let p4 = new Idea(s, p2, 450, 200, updateCallback);
      let p5 = new Idea(s, p4, undefined, undefined, updateCallback);
    });

export default angular.module('miper.controllers');
