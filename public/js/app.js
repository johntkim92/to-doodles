var app = angular.module("TodoApp", []);

app.controller('ItemsController', ['$http', function($http){
    var controller = this;

    $http.get('items').success(function(data) {
      controller.todos = data;
    });

    this.createItem = function() {
      $http.post('/items', {
        todo_value: this.value
      }).success(function(data) {
        console.log(data);
        controller.todos = data;
      });
    }

    this.deleteItem = function(id) {
      $http.delete('/items/'+ id)
        .then(function(data){
          controller.todos = data;
          console.log(data);
        }, function(error){
          console.log(error);
        });

    };


}]);
