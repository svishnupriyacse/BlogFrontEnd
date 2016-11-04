'use strict';
 
angular.module('app').controller('FriendController', ['$scope','FriendService','$location', function($scope,FriendService,$location) {
    
	var self = this;
	self.user={user_id:'',userName:'',type_of_user:'',email_id:'',phone_no:'',password:'',profilepicture:''};
    self.users=[];
    
	$scope.btntext = "sendRequest";
	

	
	fetchAllUsers();
	 function fetchAllUsers(){
		 FriendService.fetchAllUsers()
	            .then(
	            function(d) {
	                self.users = d;
	            },
	            function(errResponse){
	                console.error('Error while fetching Users');
	            }
	        );
	    }
	 function submit(){
		 alert("entered");
	 }
	 
	$scope.RequestSend = function(user){
		for(var i=0;i<self.users.length;i++){
		if(self.users[i].user_id === user.user_id){
			$scope.btntext ="Request Sent";
			$location.path("/listFriends");
		}
		}
		
		
		
	}
	
}]);