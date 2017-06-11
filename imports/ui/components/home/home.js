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
    _http = $http;
    _this = this;

    if (navigator.geolocation) {
      this.getRestaurants();
    } else {
      this.error = 'Your browser does not support geolocation';
    }

    this.helpers({
      restaurants() {

      }
    });
  }

  getRestaurants() {
    const myPos = navigator.geolocation.getCurrentPosition(function showPos(pos) {
      console.log(pos.coords);
      return pos.coords
    });

    console.log(myPos);

    // displaying loading spinner
    thatMyApp.loading = true;

    _http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.460032899999995,0.004859100000000001&radius=1500&type=restaurant&key=AIzaSyAJ0yKxvw6xtX8moGnG_73ZNx51NyucbKc'
    }).then(function successCallback(response) {
      // removing spinner
      thatMyApp.loading = false;

      _this.restaurants = response.data.results;
      console.log(_this.restaurants);
    }, function errorCallback(error) {
      thatMyApp.loading = false;

      _this.error = 'Something happened :S'
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