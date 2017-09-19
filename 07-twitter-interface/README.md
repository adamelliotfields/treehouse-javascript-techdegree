# Build a Twitter Interface

### Requirements

#### Dependency Management
:white_check_mark: Project includes a `package.json` file containing dependencies to run the project.  
:white_check_mark: Running `npm install` installs relevant dependencies.  

#### Server-Side API Access
:white_check_mark: Correctly uses an API key and secret from Twitter to communicate on the server.  
:white_check_mark: Application can be authenticated using a `config.js` file, and contains code allowing a `config.js` file to be imported into `app.js`.  

#### Correct Express Routes
:white_check_mark: Renders a template with the user’s Twitter info using the `‘/’` route.  

#### Rendered Template
:white_check_mark: Matches the sample layout: a header and three columns of data as shown.  

#### Displays Correct Information
:white_check_mark: Displays 5 tweets, 5 friends, 5 messages, and username in a Jade/Pug template that roughly matches the mockups.  

### Instructions
1.  [Download](https://github.com/adamelliotfields/treehouse-twitter-interface/archive/master.zip) and extract `treehouse-twitter-interface-master.zip`.
2.  Create a `config.js` file using your keys and tokens from your Twitter development account (see notes below).
3.  Run `npm install` or `yarn install` within the project folder to install all dependencies.
4.  Run `npm start` or `yarn start` within the project folder to run the program.
5.  Go to `http://localhost:8080` in your browser.

### Notes
**Important:** In order for the app to run, you must create a `config.js` file in the project root, using your personal keys and tokens from [apps.twitter.com](https://apps.twitter.com). The file must look exactly like this:  

```
module.exports = {
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
};
```

This app was written in ES2015, but I've compiled it to ES5 with Babel to support older versions of Node. The source file is in the `src` folder. The build is passing on Node 7.9.0, 6.10.3, and 4.8.3.  

The HTML-to-Pug and PostCSS transformation settings are inside the `build` folder.  

The minified CSS and images are in the `public` folder.  

The raw Pug templates are exported to the `dist` folder; however, the `templates` folder contains the finished hand-edited templates.  

Lastly, the `.npmrc` file is set to production mode, which only `npm install`s the relevant project dependencies. This means, however, that the build scripts will not run. If you'd like to install the development dependencies, simply comment out the first line in `.npmrc` with a `#` like this:  

```
# production = true
```
