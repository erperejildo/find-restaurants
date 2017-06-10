import templateUrl from './home.html';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import { Meteor } from 'meteor/meteor';
import { name as Language } from '../language/language';

class Home {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);
  }
}

const name = 'home';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Language
])
.component(name, {
  templateUrl,
  controllerAs: name,
  controller: Home
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state(name, {
    url: '/home',
    template: '<home></home>',
    // you can have private components/routes. i.e. this is an only public route
    // if we would be logged with our user we would be redirected to other route
    resolve: {
      currentUser($q) {
         if (Meteor.userId() !== null) {
           return $q.reject('AUTH_REQUIRED');
         } else {
           return $q.resolve();
         }
      }
    }
  });
}