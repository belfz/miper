const STATE_WORKBENCH = {
  url: '/workbench/:id',
  template: `
              <div>
                <p>workbench {{workbenchCtrl.id}}!</p>
                <svg id="main"></svg>
              </div>
            `,
  resolve: {
    //definition () - in the future, by id
    id ($stateParams) {
      return $stateParams.id;
    }
  },
  controller: 'WorkbenchController',
  controllerAs: 'workbenchCtrl'
};

export default STATE_WORKBENCH;
