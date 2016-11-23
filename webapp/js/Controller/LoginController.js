(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$rootScope','$scope','$location', 'AuthenticationService', 'FlashService','UserService'];
    function LoginController($rootScope,$scope,$location, AuthenticationService, FlashService, UserService) {
        var vm = this;
        
       
 
        vm.login = login;
        vm.Logout = Logout;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
        
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/'); 
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
        function Logout(){
        	
        	UserService.logout();
        	
        	
        }
    }
 
})();