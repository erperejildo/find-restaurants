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
      // displaying loading spinner
      thatMyApp.loading = true;

      this.getRestaurants();
    } else {
      this.noSupport = true;
      this.error = 'Your browser does not support geolocation';
    }
  }

  getUserPos() {
    this.promise = new Promise(function(resolve) {
      // getting user geolocation
      navigator.geolocation.getCurrentPosition(function showPos(pos) {
        _this.myPos = pos.coords;
        resolve(true);
      });
    });
  }

  getRestaurants() {
    this.getUserPos();

    this.promise.then(function() {
      const myAPIKey = 'AIzaSyAJ0yKxvw6xtX8moGnG_73ZNx51NyucbKc';
      _http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + _this.myPos.latitude + ',' + _this.myPos.longitude + '&radius=1500&type=restaurant&key=' + myAPIKey
      }).then(function successCallback(response) {
        // removing spinner
        thatMyApp.loading = false;

        // being a free google account for the API is quite easy to exceed the daily request quota
        if (!response.data.error_message) {
          _this.restaurants = response.data.results;

          _this.restaurants.map(function (rest) {
            if (rest.photos) {
              const photo = rest.photos[0].photo_reference;

              if (photo) {
                rest.photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=' + photo + '&key=' + myAPIKey;
              }
            }

            if (!rest.photo) {
              rest.photo = '/images/noimage.jpg';
            }
          });
        } else {
          _this.error = response.data.error_message;
        }

        console.log(response);

      }, function errorCallback(error) {
        thatMyApp.loading = false;

        _this.error = 'Something happened (maybe CORS not enabled)'
      });
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
.config(function($stateProvider) {
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
});