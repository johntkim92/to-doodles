var app = angular.module("TodoApp", []);

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.headers.patch = {
//         'Content-Type': 'application/json;charset=utf-8'
//     }
// }])

app.controller('ItemsController', ['$http', function($http){
    var controller = this;

    this.getItems = function () {
      $http.get('items').success(function(data) {
        controller.todos = data;
      });
    }

    this.getItems();

    this.createItem = function() {
      $http.post('/items', {
        todo_value: this.value,
        due_date: this.due
        // finished: this.finished

      }).success(function(data) {
        console.log(data);
        controller.todos = data;
      });
    }

    // this.editItem = function(id) {
    //   $http.patch('/items/'+ id, {
    //     item: {
    //       todo_value: this.editItemValue
    //     }
    //   }).success(function(data) {
    //     controller.getItems();
    //   }).error(function(data, status) {
    //     console.log(data);
    //   });
    // }

    this.deleteItem = function(id) {
      $http.delete('/items/'+ id)
        .then(function(data){
          controller.getItems();
          console.log(data);
        }, function(error){
          console.log(error);
        });

    };
}]);

app.controller('EditController', ['$http', '$scope', function($http, $scope) {
  this.editItem = function() {
    // console.log($scope.$parent.item._id);
    $http.patch('/items/'+$scope.$parent.item._id, {
      item: {
        todo_value: this.editItemValue
      }
    }).success(function(data){
      // console.log(data);
      $scope.$parent.items.getItems();
    });
  }
}])
