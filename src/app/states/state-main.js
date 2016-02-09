const STATE_MAIN = {
  url: '/',
  template: `
              <p>You were authenticated correctly.</p>
              <p ng-bind="mainCtrl.restrictedData.info"></p>
              <a ui-sref="workbench({id: 123})">example workbench</a>
            `,
  resolve: {
    restrictedData: function (RestrictedDataService) {
      window.console.log('resolving the route-specific data only after I was let in by the authentication gateway!');
      return RestrictedDataService.getRestrictedData();
    }
  },
  controller: 'MainController',
  controllerAs: 'mainCtrl'
};

export default STATE_MAIN;
