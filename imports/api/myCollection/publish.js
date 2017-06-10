// this file publishes data to your client. On this example you will
// publish just the values saved with the colour you want to specify

import { Meteor } from 'meteor/meteor';
import { MyCollection } from './collection';

if (Meteor.isServer) {
  Meteor.publish('myCollection', function(options, color) {
    const selector = {
      $or: [{
        $and: [{
          color: color
        }]
      }]
    };

    return MyCollection.find(selector, options);
  });
}