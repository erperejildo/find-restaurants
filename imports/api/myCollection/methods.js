// create here you APIs: return value and throw errors

import _ from 'underscore';
import { Meteor } from 'meteor/meteor';

import { MyCollection } from './collection';

if (Meteor.isServer) {
	Meteor.methods({
		removeAllPosts: function () {
			MyCollection.remove({});
		},
		addValue: function(newValue, plateId) {
            check(newValue, String);
            check(plateId, String);

			if (newValue === '') {
				throw new Meteor.Error('500', 'The new value cannot be empty');
			}

			NewValue.insert({
				prop1: newValue,
				date: new Date(),
				user: Meteor.user()._id
			});
		}
	});
}