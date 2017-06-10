// define here your collection on your ddbb. To create more collections
// just clone the main folder

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const MyCollection = new Mongo.Collection('myCollection');

MyCollection.allow({
	insert(userId, newValue) {
		newValue.date = new Date();
		return userId;
	},
	update() {
		return false;
	},
	remove(userId, newValue) {
		return userId;
	}
});
