# browserify-lightninground

brief overview of using browserify from a beginner's perspective

## Setup
You must have npm installed.
```
brew install node
```

Clone this repository:
* `cd <some path you will remember>`
* `git clone https://github.com/lbrugg/browserify-lightninground.git` (or whatever clone link is)
* `cd browserify-lightninground`

## Using browserify

### Setup
* `git reset --hard origin/browserify`
* `npm install`
* `browserify scripts/app.js -o build/bundle.js`
* go to page `<installation path>/browserify-lightninground/html/index.html`

### What is happening?
* With `npm install` you are installing the modules definied in `package.json`. Browserify is specified in that package.
* `browserify scripts/app.js -o bundle.js` recursively analyzes all the require() calls in your app (starting with `scripts/app.js`) and builds `bundle.js` with all the dependencies.
* `bundle.js` is included on `html/index.html` like you would normally include a script.



## Using gulp with browserify

### Setup
* `git reset --hard origin/browserify-gulp`
* `npm install`
* `gulp browserify`

### What is happening?
* Again, with `npm install` you are installing the dependencies needed in the app and the build process.
* Gulp is a task runner/manager. You can run your browserify tasks through it.
* Gulp tasks are defined in `gulpfile.js`. `browserify` is a task defined in gulpfile.js which calls the browserify process.
* Another task in `gulpfile.js` is `watch`. It will watch for changes to your js file and automatically update the compiled `bundle.js` file.



## Separate out a vendor file

You can use browserify to specifically bundle vendor files separately from your own application. This is especially useful for rooting out bugs in third-party applications, or for making your bundled resources smaller.

### Setup
* `git reset --hard origin/gulp-with-vendor`
* `npm install`
* `gulp build`

### What is happening?
* See previous steps for information on `npm` and `gulp`.
* We now have a `vendor` gulp task which finds the dependencies defined in `package.json` and bundles them into a `vendor.js` file.
* The `browserify` task has been modified to exclude the dependencies in `package.json`.
* The `index.html` file has been modified to include the `vendor.js` file along with `bundle.js`, which holds our app.