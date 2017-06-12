# find-restaurants
Find restaurants 1.5km near you.

## Set up

- Download Meteor: https://www.meteor.com/install
- Install dependencies `npm install`
- Run the project either with `meteor run` (first time will take a while)
<br>You also can run the project directly on your phone with `meteor run android-device` (also available for IOS but not tested)
- To avoid CORS isues install this extension on Chrome (or similar one on different browser): https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

## Build
If you only want to build the project (not deploy it) just run:
- `npm install --production`
- `meteor build /path/to/build --architecture os.linux.x86_64` (for example if deploying to a Ubuntu linux server)

To build a mobile apk:
- `meteor add-platform android` (also available for IOS but not tested)
- `meteor build ../output-build --server http://MY_SERVE_IP` <br>
we will found our apk to be installed on our Android device