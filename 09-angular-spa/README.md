# AngularJS Single Page App

### Requirements

#### Routes
:white_check_mark: Browsing to the URL `/#!/` displays a list of the available recipes.  
:white_check_mark: Browsing to the URL `/#!/edit/{id}` displays the details for the specified recipe.  

#### Recipes Screen
:white_check_mark: Displays the list of available recipes.  
:white_check_mark: Selecting a category filters the list of recipes by that category.  
:white_check_mark: Clicking on a recipe row’s “Edit” link displays the “Recipe Detail” screen for that recipe.  
:white_check_mark: Clicking on a recipe row’s “Delete” link deletes that row’s recipe.  
:white_check_mark: Clicking the “Add Recipe” button displays the “Recipe Detail” screen so that a recipe can be added.  
:white_check_mark: When deleting a recipe, the user is asked for confirmation before the item is deleted.  

#### Recipe Detail Screen
:white_check_mark: Displays the detail for the specified recipe.  
:white_check_mark: When adding or updating a recipe the following values are properly saved: Name, Description, Category, Prep Time, Cook Time.  
:white_check_mark: One or more ingredients can be added.  
:white_check_mark: One or more steps can be added.  
:white_check_mark: When adding or updating an ingredient the following values are properly saved: Item, Condition, Quantity.  
:white_check_mark: When adding or updating a step the “Description” value is properly saved.  

#### Uses Immediately Invoked Function Expression
:white_check_mark: All JavaScript files use immediately invoked functions to keep variables and/or functions from leaking into the global namespace.  

### Instructions
1. Download and extract [treehouse-angular-spa-master.zip](https://github.com/adamelliotfields/treehouse-angular-spa/archive/master.zip).
2. Run `npm install` or `yarn install` within the project folder to install all dependencies.
3. Run `npm start` or `yarn start` to start the server.
4. Go to `http://localhost:5000` in your browser.
