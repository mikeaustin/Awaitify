# Awaitify


## Installing and starting the web app

Run `npm install` to install dependencies

Run `npm start` to start the web app


## Building without starting the app

Run `npm run build` to run webpack and create the bundle and html files in the dist folder


## Testing

### Regression testing

Run `npm test` to ensure recent changes pass all current tests

This runs tests in `src/awaitify.test.js`

### Experimental tests

Run `npm run test:experimental` to test experimental code

This runs tests in `src/awaitify.experimental.test.js`


## Deploying to GitHub Pages

Run `npm run deploy` to build and deploy to the GitHub gh-pages branch

The build can be found at https://mikeaustin.github.io/Awaitify
