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

      // Method 1: getting info from Google using Google Map Web Services
      _http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + _this.myPos.latitude + ',' +_this.myPos.longitude + '&radius=1500&type=restaurant&key=' + myAPIKey
      }).then(function successCallback(response) {
        // removing spinner
        thatMyApp.loading = false;
        _this.error = false;

        // being a free google account for the API is quite easy to exceed the daily request quota
        if (!response.data.error_message) {
          _this.restaurants = response.data.results;

          _this.restaurants.map(function (rest) {
            console.log(rest);

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
      }, function errorCallback(error) {
        thatMyApp.loading = false;

        _this.error = 'Something happened (maybe CORS not enabled)'
      });
    });
  }

  changeFilter() {
    if (this.orderBy === '-rating') {
      this.orderBy = 'rating';
      this.up = true;
    } else {
      this.orderBy = '-rating';
      this.up = false;
    }
  }

  showMap(latitude, longitude) {
    if (this.mapDisplayed) {
        this.mapDisplayed = false;
    } else {
      // open the popup
      this.mapDisplayed = true;

      // Method 2: getting info from Google using JS and Google lib
        console.log(map);
      const pointA = new google.maps.LatLng(this.myPos.latitude, this.myPos.longitude),
        pointB = new google.maps.LatLng(latitude, longitude),
        myOptions = {
          zoom: 2,
          center: pointA
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

      // get route from A to B
      directionsService.route({
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.WALKING
      }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      // fix grey background on the map
        setTimeout(function(){
          google.maps.event.trigger(map, 'resize');
        }, 0);

    }
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
    // you can have private components/routes. i.e. this is an only public mapRoute
    // if we would be logged with our user we would be redirected to other mapRoute
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