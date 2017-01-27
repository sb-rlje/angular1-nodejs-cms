// register controller
app.controller('registerController', function($scope, $http, $location) {
    $scope.athlete = {};
        $scope.addAthlete = function(error) {
        $http.post('users/register', {
          username: $scope.athlete.username, 
          password: $scope.athlete.password            
        })
    };
});

// login controller
app.controller('loginController', function($scope, $http, $window) {
    $scope.user = {};
        $scope.addUser = function(error) {
        $http.post('users/login', {
          username: $scope.user.username, 
          password: $scope.user.password       
        }).then(function(data, status){
      $window.location.href = data.redirect; 
    });
    };
});

// training controller
app.controller('trainingController', function($scope, $http, $location) {

        $scope.training = {};
        $scope.trainingType = 0;
      
        $scope.addTraining = function(error) {
        $http.post('users/training', {
          username: $scope.training.username, 
          password: $scope.training.password,
          type: $scope.training.type, 
          session: $scope.training.session, 
          location: $scope.training.location              
        })
    };
});

// blog controller
app.controller('blogController', function($scope, $http) {
    $scope.blog = {};
    $http.get('api/blog').success(function(response){
      $scope.blog = response;
    });
    $scope.tab = 'blog';
    
     $scope.selectTab = function(setTab){
        $scope.tab = setTab;
      };
    
      $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
      };
    
      $scope.blog = {};

      $scope.addBlog = function(){
        $scope.blog.createdOn = Date.now();
       //$scope.blog.unshift(this.post);
        $scope.tab = 0;
        //$scope.blog ={};
        $http.post('api/blog', {
               title: $scope.blog.title,
               body: $scope.blog.body
          });
      };   
    
      $scope.remove = function(id) {
  	    console.log(id);
  	    $http.delete('api/blog/' + id);
      };
    
});