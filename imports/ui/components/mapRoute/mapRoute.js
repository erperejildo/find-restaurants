import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';

import { Meteor } from 'meteor/meteor';

import templateUrl from './mapRoute.html';

class MapRoute {
  constructor($scope, $reactive, $http) {
    'ngInject';
    $reactive(this).attach($scope);
    _http = $http;
    _this = this;






      function initMap() {
          var pointA = new google.maps.LatLng(51.7519, -1.2578),
              pointB = new google.maps.LatLng(50.8429, -0.1313),
              myOptions = {
                  zoom: 7,
                  center: pointA
              },
              map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
              // Instantiate a directions service.
              directionsService = new google.maps.DirectionsService,
              directionsDisplay = new google.maps.DirectionsRenderer({
                  map: map
              }),
              markerA = new google.maps.Marker({
                  position: pointA,
                  title: "point A",
                  label: "A",
                  map: map
              }),
              markerB = new google.maps.Marker({
                  position: pointB,
                  title: "point B",
                  label: "B",
                  map: map
              });

          // get route from A to B
          calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

      }



      function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
          directionsService.route({
              origin: pointA,
              destination: pointB,
              avoidTolls: true,
              avoidHighways: false,
              travelMode: google.maps.TravelMode.DRIVING
          }, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
              } else {
                  window.alert('Directions request failed due to ' + status);
              }
          });
      }

      initMap();






      _http({
          method: 'GET',
          // url: 'https://maps.googleapis.com/maps/api/directions/json?origin=' + _this.myPos.latitude + ',' + _this.myPos.longitude + '&destination=place_id:ChIJ1W-BYdGp2EcRq6GXnlqcKGU&key=AIzaSyAJ0yKxvw6xtX8moGnG_73ZNx51NyucbKc'
          url: 'https://maps.googleapis.com/maps/api/directions/json?origin=51.459848199999996,0.0060482&destination=place_id:ChIJ1W-BYdGp2EcRq6GXnlqcKGU&key=AIzaSyAJ0yKxvw6xtX8moGnG_73ZNx51NyucbKc'
      }).then(function successCallback(response) {
          // latitude 51.459848199999996
          // longitude 0.0060482
          // being a free google account for the API is quite easy to exceed the daily request quota
          if (!response.data.error_message) {
              _this.route = response.data.routes[0].legs[0];
              console.log(_this.route);
          } else {
              _this.error = response.data.error_message;
          }
      }, function errorCallback(error) {
          thatMyApp.loading = false;

          _this.error = 'Something happened (maybe CORS not enabled)'
      });

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