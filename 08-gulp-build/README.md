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
