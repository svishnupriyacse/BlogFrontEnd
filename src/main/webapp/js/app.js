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
                controller: 'HomeController',
                templateUrl: 'views/BlogPage.html',
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
            .when('/viewforum', {
                controller: 'ForumController',
                templateUrl: 'views/ViewForum.html',
                controllerAs: 'vm'
            })
            .when('/viewjob', {
                controller: 'JobController',
                templateUrl: 'views/ViewJob.html',
                controllerAs: 'jobs'
            })
            .when('/home', {
                /*controller: 'JobController',*/
                templateUrl: 'views/home.html',
               /* controllerAs: 'jobs'*/
            })
 
 
            .otherwise({ redirectTo: '/login' });
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
            var restrictedPage = $.inArray($location.path(), ['/home','/blogpage','/login', '/register','/viewblog','/viewforum','/viewjob','/viewevents']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
          
            if (restrictedPage && !loggedIn) {
            	
                $location.path('/login');
            }
        });
    }
 
})();
 