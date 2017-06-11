import templateUrl from './myApp.html';
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import { name as Loading } from '../loadingScreen/loadingScreen';
import { name as Home } from '../home/home';

class MyApp {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        thatMyApp = this;
    }
}
const name = 'myApp';

// create a module
export default angular.module(name, [
    ngSanitize,
    angularMeteor,
    uiRouter,
    Loading,
    Home,
    'accounts.ui'
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller: MyApp
})
.config(function ($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
});

