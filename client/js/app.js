'use strict';
var app = angular.module('app', ['ngResource','ui.router'])
  app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
      
    $stateProvider
    	//login
    	.state('login', {
          url: '/login',
          templateUrl: '../partials/login.html',
          controller: 'loginController'
        })
			
		//register
      	.state('register', {
          url: '/register',
          templateUrl: '../partials/register.html',
          controller: 'registerController'
        }) 

         // dashboard
        .state('dashboard', {
          url: '/',
          templateUrl: '../partials/dashboard.html',
          controller: 'blogController'
        }) 
  
   		//training registration flow
	    .state('training', {
	        url: '/training',
	        templateUrl: 'partials/training/training.html',
	        controller: 'trainingController'
	    })
	    
	    .state('training.type', {
	        url: '/type',
	        templateUrl: 'partials/training/training-type.html'
	    })
	    
	    .state('training.session', {
	        url: '/session',
	        templateUrl: 'partials/training/training-session.html'
	    })
	    
	    .state('training.location', {
	        url: '/location',
	        templateUrl: 'partials/training/training-location.html'
	    })
	    
	    // url will be nested (/form/profile)
	    .state('training.register', {
	        url: '/profile',
	        templateUrl: 'partials/training/training-register.html'
	    })
  }) 


.run(function($rootScope, $http){
	$rootScope.message = '';
	$rootScope.logout = function(){
	  $rootScope.message = 'Logged out.';
	  $http.post('/logout');
	};
});
