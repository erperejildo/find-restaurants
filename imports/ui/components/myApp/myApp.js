import templateUrl from './myApp.html';
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import Translate from 'angular-translate';
import TranslateJSONs from 'angular-translate-loader-static-files';
import { name as Loading } from '../loadingScreen/loadingScreen';
import { name as Home } from '../home/home';

class MyApp {
    constructor($scope, $reactive, $state, $transitions) {
        'ngInject';
        $reactive(this).attach($scope);

        // you can create global variables on this general file and have
        // then on your others components
        thatMyApp = this;
        // thatMyApp.loading = true; // you can use this one wherever you want

        // or maybe create variables just for this components
        this.currentPath = false;

        // control over path changes
        $transitions.onSuccess(
            { to: '*', from: '*' },
            (trans) => this.currentPath = trans.$to().name
        );

        this.helpers({
            myHelper() {
                // use this helper on your template with Angular like this:
                // <span ng-hide="myApp.myHelper">I'm hide</span>
                return true;
            }
        });
    }

    myFunction() {
        // call this function on your template doing myApp.myFunction()
    }
}
const name = 'myApp';

// create a module
export default angular.module(name, [
    ngSanitize,
    angularMeteor,
    uiRouter,
    Translate,
    TranslateJSONs,
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
})
.config(function ($translateProvider) {
    'ngInject';

    // configure here your different language
    $translateProvider.useStaticFilesLoader({
        prefix: 'langs/',
        suffix: '.json'
    });

    let savedLang = localStorage.getItem('myApp-lang');
    if (!savedLang) {
        const deviceLang = (navigator.language).substring(0, 2);
        if (deviceLang.length === 2) {
            savedLang = deviceLang;
        } else {
            savedLang = 'en';
        }
        localStorage.setItem('myApp-lang', savedLang)
    }

    $translateProvider
        .preferredLanguage(savedLang)
        .useSanitizeValueStrategy(null);
});

