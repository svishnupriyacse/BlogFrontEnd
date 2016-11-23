'use strict';
 
angular.module('app').controller('CommentController', ['$rootScope','$scope', 'Commentservice','AuthenticationService', function($rootScope,$scope, Commentservice,AuthenticationService) {
    
	var self = this;
	self.comment={serialNo:null,eventId:'',userId:$rootScope.globals.currentUser.username,commends:''};
    self.comments=[];
    
    self.submit = submit;
   // self.edit = edit;
    //self.remove = remove;
    self.reset = reset; 
    
    fetchAllComments();
    
   
 
    function fetchAllComments(){
    	Commentservice.fetchAllComments()
            .then(
            function(d) {
                self.comments = d;
            },
            function(errResponse){
                console.error('Error while fetching jobs');
            }
        );
    }
    function CreateComment(comment){
    	
    	Commentservice.CreateComment(comment)
            .then(
            		$scope.message="Successfully Added",
            		fetchAllComments,
            		
            function(errResponse){
                console.error('Error while creating jobs');
            }
        );
    	reset();
    }
    function submit() {
        if(self.comment.serialNo===null){
            console.log('Saving New Forum', self.forums);
            CreateComment(self.comment);
        }else{
            updateJob(self.forum, self.forum.forumid);
            console.log('User updated with id ', self.forum.forumid);
        }
        reset();
    }
    
 
    function reset(){
    	self.comment={serialNo:null,eventId:'',userId:$rootScope.globals.currentUser.username,commends:''};
    	$scope.myForm.$setPristine(); //reset Form
    }
}]);