import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';

import { Meteor } from 'meteor/meteor';

import templateUrl from './mapRoute.html';

class MapRoute {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({

    });
  }
}

const name = 'mapRoute';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
  ])
.component(name, {
  templateUrl,
  controllerAs: name,
  controller: MapRoute
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state(name, {
    url: '/map-route',
    template: '<map-route></map-route>'
  });
}