import templateUrl from './loadingScreen.html';
import angular from 'angular';
import angularMeteor from 'angular-meteor';

class LoadingScreen {}

const name = 'loadingScreen';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl,
  controllerAs: name,
  controller: LoadingScreen
});