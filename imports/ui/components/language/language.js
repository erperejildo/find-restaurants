// this component is loaded only on home page

import templateUrl from './language.html';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import { Meteor } from 'meteor/meteor';

class Language {
  constructor($scope, $reactive, $translate) {
    'ngInject';
    $reactive(this).attach($scope);

    translate = $translate;

    const savedLang = localStorage.getItem('myApp-lang');
    this.currentLang = savedLang;

    this.langs = ['en','es'];

    this.helpers({

    });
  }

  changeLang(lang) {
    this.currentLang = lang;
    translate.use(lang);
    localStorage.setItem('myApp-lang', lang);
  }

  goBack() {
    window.history.back();
  }
}

const name = 'language';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
  ])
.component(name, {
  templateUrl,
  controllerAs: name,
  controller: Language
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state(name, {
    url: '/language',
    template: '<language></language>'
  });
}