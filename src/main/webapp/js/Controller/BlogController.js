'use strict';
 
angular.module('app').controller('BlogController', ['$scope','$location','BlogService', function($scope,$location,BlogService) {
    
	var self = this;
	self.blog={blogId:'', blogName:'',userId:'',content:'',status:'NA',Description:''};
    self.blogs=[];
    
    self.submit = submit;
    //self.edit = edit;
   // self.remove = remove;
    self.reset = reset; 
    
    fetchAllBlogs();
    reset();
    function fetchAllBlogs(){
    	BlogService.fetchAllBlogs()
            .then(
            function(d) {
                self.blogs = d;
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
            }
        );
    }
    function submit() {
        if(self.blog.blogId===null){
            console.log('Creating New Blog', self.blogs);
            createBlog(self.blog);
        }else{
            //updateUser(self.blog, self.blog.blogId);
            console.log('User updated with id ', self.blogs.userId);
        }
        reset();
    }
    function createBlog(blog){
        BlogService.createBlog(blog)
            .then(
            		$scope.message="your are successfully Registered",
            		fetchAllBlogs,
            function(errResponse){
                console.error('Error while creating Blog');
            }
        );
    }
    function deleteblog(id){
    	BlogService.deleteBlog(id)
            .then(
            fetchAllJobs,
            function(errResponse){
                console.error('Error while deleting jobs');
            }
        );
    }
    
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.blogs.length; i++){
            if(self.blogs[i].blogId === id) {
                self.blog = angular.copy(self.blogs[i]);
               
                break;
            }
        }
    }
    function updateBlog(blog, id){
    	BlogService.updateBlog(blog, id)
            .then(
            		fetchAllBlogs,
            function(errResponse){
                console.error('Error while updating jobs');
            }
        );
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.blog.blogId === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteJob(id);
    }
 
 
 
    function reset(){
    	self.blog={blogId:null,blogName:'',userId:'',content:'',status:'NA',Description:''};
       //$scope.myform.$setPristine(); //reset Form
    }
    
}]);