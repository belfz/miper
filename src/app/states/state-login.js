const STATE_LOGIN = {
  url: '/login',
  template: `
              <div>
                <form name="loginCtrl.loginForm" ng-submit="loginCtrl.login()">
                  <input ng-model="loginCtrl.user.username" type="text" name="username" placeholder="username" />
                  <input ng-model="loginCtrl.user.password" type="password" name="password" placeholder="password" />
                  <input type="submit" value="login" />
                </form>
                <p ng-if="loginCtrl.loginErrorVisible">Incorrect username or password!</p>
              </div>
            `,
  controller: 'LoginController',
  controllerAs: 'loginCtrl'
};

export default STATE_LOGIN;
