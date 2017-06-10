import angular from 'angular';

import { Meteor } from 'meteor/meteor';
import { name as myApp } from '../imports/ui/components/myApp/myApp';

function onReady() {
	angular.bootstrap(document, [myApp], {
		strictDi: true
	});

	// do mobile stuff when the device is ready

}

if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}