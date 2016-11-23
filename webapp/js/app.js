(function () {
    'use strict';
 
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
 
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'views/home.html',
                controllerAs: 'vm'
            })
            .when('/blogpage', {
                controller: 'BlogController',
                templateUrl: 'views/BlogPage.html',
                controllerAs: 'vm'
            })
            .when('/myfriends', {
               controller: 'FriendController',
                templateUrl: 'views/MyFriends.html',
                controllerAs: 'vm'
            })
            .when('/listFriends', {
               controller: 'FriendController',
                templateUrl: 'views/listFriends.html',
                controllerAs: 'vm'
            })
            .when('/chat', {
              // controller: 'HomeController',
                templateUrl: 'views/chat.html',
                //controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                controllerAs: 'vm'
            })
            .when('/viewprofile', {
                //controller: 'LoginController',
                templateUrl: 'views/viewprofile.html',
                //controllerAs: 'vm'
            })
            .when('/forum', {
                controller: 'ForumController',
                templateUrl: 'views/CreateForum.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'views/Register.html',
                controllerAs: 'vm'
            })
            .when('/event', {
                //controller: 'EventController',
                templateUrl: 'views/AddEvent.html',
                //controllerAs: 'vm'
            })
            .when('/job', {
                controller: 'JobController',
                templateUrl: 'views/JobList.html',
                controllerAs: 'jobs'
            })
            .when('/blog', {
                controller: 'BlogController',
                templateUrl: 'views/CreateBlog.html',
                controllerAs: 'vm'
            })
            .when('/viewblog', {
                controller: 'BlogController',
                templateUrl: 'views/ViewBlog.html',
                controllerAs: 'blog'
            })
            .when('/viewevents', {
                controller: 'JobController',
                templateUrl: 'views/ViewEvent.html',
                controllerAs: 'jobs'
            })
            .when('/viewjobs', {
                controller: 'JobController',
                templateUrl: 'views/ViewJob.html',
                controllerAs: 'jobs'
            })
            .when('/viewforum', {
                controller: 'ForumController',
                templateUrl: 'views/ViewForum.html',
                controllerAs: 'vm'
            })
            .when('/forumpage', {
                controller: 'ForumController',
                templateUrl: 'views/ForumPage.html',
                controllerAs: 'vm'
            })
            .when('/viewjob', {
                controller: 'JobController',
                templateUrl: 'views/ViewJob.html',
                controllerAs: 'jobs'
            })
            .when('/home', {
            	controller: 'HomeController',
                templateUrl: 'views/home.html',
                controllerAs: 'vm'
            })
            .when('/searchfriends', {
            	controller: 'FriendController',
                templateUrl: 'views/listFriends.html',
                controllerAs: 'vm'
            })
 
 
            .otherwise({ redirectTo: '/home' });
    }
 
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/','/home','/login', '/register','/viewblog','/viewforum','/viewjob','/viewevents',]) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            
            if (restrictedPage && !loggedIn) {
            	
                $location.path('/login');
            }
            else{
            	var Role = $rootScope.globals.currentUser.role;
            	var UserRestricted = $.inArray($location.path(),['/job']) == 0
            	if(UserRestricted && Role != 'Admin'){
            		alert("you cannot do this operation as you are logged in as "+Role)
            		$location.path("/")
            	}
            }
        });
    }
 
})();
 