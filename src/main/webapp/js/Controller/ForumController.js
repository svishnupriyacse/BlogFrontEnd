'use strict';
 
angular.module('app').controller('ForumController', ['$scope', 'ForumService', function($scope, ForumService) {

	var self = this;
	self.forum={forumid:'',forum_title:'',forum_content:'',creationdate:''};
    self.forums=[];
    
    self.submit = submit;
  
    fetchAllForums();
    reset();
    function CreateForum(forum){
    	ForumService.createForum(forum)
            .then(
            		$scope.message="Successfully Added",
            fetchAllForums,
            function(errResponse){
                console.error('Error while creating jobs');
            }
        );
    }
    function fetchAllForums(){
    	ForumService.fetchAllForums()
            .then(
            function(d) {
                self.forums = d;
            },
            function(errResponse){
                console.error('Error while fetching Forums');
            }
        );
    }
    
    function submit() {
        if(self.forum.forumid===null){
            console.log('Saving New Forum', self.forums);
            CreateForum(self.forum);
        }else{
            updateJob(self.forum, self.forum.forumid);
            console.log('User updated with id ', self.forum.forumid);
        }
        reset();
    }
    function reset(){
    	self.forum={forumid:null,forum_title:'',forum_content:''};
    	//$scope.myForm.$setPristine(); //reset Form
    }

}]);