# find-restaurants
Find restaurants 1.5km around you and see the route on the map with your GPS.<br>
This project can be used also to make routes for hotels, tubes stations and other different places, just change the API parameters.<br>
This can be also reusabled by other apps which require different components using the same skeleton and the CSS library.

## Set up
- Download Meteor: https://www.meteor.com/install
- Install dependencies `npm install`
- Run the project either with `meteor run` (first time will take a while)
<br>You also can run the project directly on your phone with `meteor run android-device` (also available for IOS but not tested)
- To avoid CORS issues install this extension on Chrome (or similar one on different browser): https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
- In order to use Google APIs you will need to use an API key. If you do not have one go here: https://developers.google.com/maps/documentation/javascript/get-api-key <br>
You will also need to add this new key in `home.js` a and `index.html`

## Build
If you only want to build the project (not deploy it) just run:
- `npm install --production`
- `meteor build /path/to/build --architecture os.linux.x86_64` (for example if deploying to a Ubuntu linux server)

To build a mobile apk:
- `meteor add-platform android` (also available for IOS but not tested)
- `meteor build ../output-build --server http://MY_SERVE_IP` <br>
we will found our apk to be installed on our Android device
