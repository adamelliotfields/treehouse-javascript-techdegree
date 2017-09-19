(function () {
  angular.module('app')
    .controller('RecipeDetailController', function ($scope, $location, $routeParams, dataService) {
      $scope.errors = [];

      if ($location.path() === '/add') {
        $scope.mode = 'add';
        $scope.recipe = { ingredients: [], steps: [] };
      } else {
        $scope.mode = 'edit';
        dataService.getRecipe($routeParams.id, function (response) {
          $scope.recipe = response.data;
        });
      }

      dataService.getCategories(function (response) {
        $scope.categories = response.data;
      });

      dataService.getFoodItems(function (response) {
        $scope.foodItems = response.data;
      });

      $scope.saveRecipe = function () {
        $scope.errors = [];
        if ($scope.mode === 'add') {
          $scope.createRecipe();
        } else {
          $scope.updateRecipe();
        }
      };

      $scope.createRecipe = function () {
        dataService.createRecipe($scope.recipe,
          function (response) {
            $scope.showRecipes();
          },
          function (response) {
            $scope.getErrors(response);
          }
        );
      };

      $scope.updateRecipe = function () {
        dataService.updateRecipe($scope.recipe,
          function (response) {
            $scope.showRecipes();
          },
          function (response) {
            $scope.getErrors(response);
          }
        );
      };

      $scope.getErrors = function (response) {
        for (let error in response.data.errors) {
          $scope.errors.push(response.data.errors[error][0].userMessage);
        }
      };

      $scope.showRecipes = function () {
        $location.path('/');
      };

      $scope.deleteIngredient = function ($index) {
        $scope.recipe.ingredients.splice($index, 1);
      };

      $scope.addIngredient = function () {
        $scope.recipe.ingredients.push({
          foodItem: '',
          condition: '',
          amount: ''
        });
      };

      $scope.deleteStep = function ($index) {
        $scope.recipe.steps.splice($index, 1);
      };

      $scope.addStep = function () {
        $scope.recipe.steps.push({ description: '' });
      };
    });
}());
