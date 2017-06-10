# angular-meteor-skeleton
Default and basic scaffolding of an angular-meteor project using ES6. Configured for mobile apps and websites.

## Set up

- Download Meteor: https://www.meteor.com/install
- Install dependencies `npm install`
- Run the project either with `meteor run` (first time will take a while) or `meteor run --settings ./imports/settings.json`
if you are using some constant or environment variables.<br>
You also can run the project directly on your phone with `meteor run android-device --settings ./imports/settings.json` (also available with IOS)

## Build and deploy
If you only want to build the project (not deploy it) just run:
- `npm install --production`
- `meteor build /path/to/build --architecture os.linux.x86_64` (for example if deploying to a Ubuntu linux server)

Either way this previous commands are not necessary as long as we have the deployment already configurated on this project. Have a look to
the text file on `/.deploy/read.txt`

To build a mobile project add the platform:
- `meteor add-platform android` (also available for IOS)
- `meteor build ../output-build --server http://MY_SERVE_IP --mobile-settings ./imports/settings.json`
In `output-buil/android/release-unsigned.apk` we will found our apk to be installed on our Android device.<br>If you want to publish this app
on the Android Market you will need to sign it:
- `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore private/myApp.keystore ../output-build/android/release-unsigned.apk myApp`<br>
and align it:
- `myPath/Android/sdk/build-tools/23.0.3/zipalign 4 ../output-build/android/release-unsigned.apk ../output-build/myApp.apk`

## Testing
`meteor test --driver-package sanjo:jasmine`

----------
Every file and folder on the project is documented, just have a look to the `read.txt` file or at the top of the file to see the comments.
For further info go to the Meteor guide (https://guide.meteor.com/index.html) and angular-meteor repo (https://github.com/urigo/angular-meteor/)
