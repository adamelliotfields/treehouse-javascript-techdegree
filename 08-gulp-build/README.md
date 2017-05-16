# Using Gulp to Build a Front End Website

### Requirements

#### Build Process Dependencies
:white_check_mark: Running the npm install command installs the build process dependencies properly.  

#### Scripts Task
:white_check_mark: The `gulp scripts` command concatenates, minifies, and copies all of the project’s JavaScript files into an `all.min.js` file.  
:white_check_mark: The command copies the `all.min.js` file into the `dist/scripts` folder.  
:white_check_mark: The `gulp scripts` command lints the project’s JavaScript files using ESLint and if there’s an error, the error outputs to the console and the build process is halted.  

#### Styles Task
:white_check_mark: The `gulp styles` command compiles the project’s SCSS files into CSS, and concatenates and minifies into an `all.min.css` file.  
:white_check_mark: The command copies the `all.min.css` file into the `dist/styles` folder.  

#### Source Maps
:white_check_mark: The `gulp scripts` command generates JavaScript source maps.  
:white_check_mark: The `gulp styles` command generates CSS source maps.  

#### Images Task
:white_check_mark: The gulp `images` command copies the optimized images to the `dist/content` folder.  

#### Clean Task
:white_check_mark: The `gulp clean` command deletes all of the files and folders in the `dist` folder.  

#### Build Task
:white_check_mark: The `gulp build` command properly runs the `clean`, `scripts`, `styles`, and `images` tasks.  
:white_check_mark: The `clean` task fully completes before the `scripts`, `styles`, and `images` tasks are ran.  

#### Default Task
:white_check_mark: The `gulp` command properly runs the `build` task as a dependency.  
:white_check_mark: The `gulp` command serves the project using a local webserver.  
:white_check_mark: The `gulp` command also listens for changes to any `.scss file`. When there is a change to any `.scss file`, the gulp styles command is run, the files are compiled, concatenated and minified to the `dist` folder, and the browser reloads, displaying the changes.  

### Instructions
1.  [Download](https://github.com/adamelliotfields/treehouse-gulp-build/archive/master.zip) and extract `treehouse-gulp-build-master.zip`.
2.  Run `npm install --global gulp-cli` to get global access to the `gulp` command in your shell.
3.  Run `npm install` or `yarn install` within the project folder to install all dependencies.
4.  Run `npm start` or `yarn start` within the project folder to run the `gulp default` script, which will start the server and open your browser to `http://localhost:8080`.

### Notes
You MUST have Gulp installed globally to run gulp commands outside of `node_modules/.bin`.  

The `gulp clean` task runs first, and all other tasks are dependent on it.  

`gulp scripts` runs after `gulp clean` and will exit the script if there are any ESLint errors in `src/js/*.js`. The concatenated, sourcemapped, and minified JavaScript resides in `dist/scripts/all.min.js`.  

`gulp styles` will concatentate, compile, sourcemap, and minify all Sass files to `dist/styles/all.min.css`.  

`gulp images` process all images using `imagemin`, which compresses them for the web.  

`gulp watch` watches all files in the `src/sass` folder and will run the `gulp styles` script on changes and log the changed file to the shell. To see live reloading in action, simply change any of the first 5 color variables in `src/sass/_variables.scss`.  

`gulp build` will run all build tasks sequentially.  

`gulp default` will run `gulp build`, start `gulp watch`, and start the local live reload server.  

The local server uses the `connect-livereload` middleware for Express to inject a script into the rendered HTML that looks for a live reload server on `http://localhost:35729`. The `livereload` server watches changes in the `dist/styles` folder. Template rendering is handled by `react`.  
