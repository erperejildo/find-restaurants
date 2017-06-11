import templateUrl from './home.html';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import { Meteor } from 'meteor/meteor';
import { name as Range } from '../../filters/range';

class Home {
  constructor($scope, $reactive, $http) {
    'ngInject';
    $reactive(this).attach($scope);

    that = this;

    console.log(this.getPos());

    if (navigator.geolocation) {
      // displaying loading spinner
      thatMyApp.loading = true;

      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.460032899999995,0.004859100000000001&radius=1500&type=restaurant&key=AIzaSyAJ0yKxvw6xtX8moGnG_73ZNx51NyucbKc'
      }).then(function successCallback(response) {
        // removing spinner
        thatMyApp.loading = false;
        that.restaurants = response.data.results;
        console.log(that.restaurants);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    } else {
      this.noGeolocation = true;
    }

    this.helpers({
      restaurants() {

      }
    });
  }

  getPos() {
    navigator.geolocation.getCurrentPosition(function showPos(pos) {
      return pos.coords
    });
  }
}

const name = 'home';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Range
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