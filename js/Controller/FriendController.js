'use strict';
 
angular.module('app').controller('FriendController', ['$rootScope','$scope','FriendService','AuthenticationService','$location', function($rootScope,$scope,FriendService,AuthenticationService,$location) {
    
	var self = this;
	self.friend = {serialNo:'',userId:$rootScope.globals.currentUser.username,friendId:'',status:'',isonline:''};
	self.friends = [];
	self.submit = submit;

	
	fetchAllUsers($rootScope.globals.currentUser.username);
	myfriends($rootScope.globals.currentUser.username);
	 function fetchAllUsers(userId){
		 FriendService.listFriends(userId)
	            .then( 
	            function(d) {
	                self.users = d;
	            },
	            function(errResponse){
	                console.error('Error while fetching Users');
	            }
	        );
	    }
	 function myfriends(userId){
		 FriendService.getmyFriends(userId)
		 .then( 
		            function(d) {
		                self.users = d;
		            },
		            function(errResponse){
		                console.error('Error while fetching my friends');
		            }
		        );
	 }
	 function createfriend(friend){
		 FriendService.CreateFriends(friend)
         .then(
         		$scope.message="Send request",
         		
         function(errResponse){
             console.error('Error while creating friends');
         }
     );
	 }
	 function submit(username){
		
			self.friend.friendId = username;
			self.friend.status ='N';
			self.friend.isonline ='N';
			createfriend(self.friend);
		
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