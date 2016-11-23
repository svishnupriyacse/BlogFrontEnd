'use strict';
 
angular.module('app').factory('FriendService', ['$http', '$q','AuthenticationService', function($http, $q,AuthenticationService){
	
	 var REST_SERVICE_URI = 'http://localhost:8081/CollaborationPortal/friends/';
	 
	 
	 
	    var factory = {
	    		listFriends: listFriends,
	     
	        CreateFriends : CreateFriends,
	        getmyFriends  : getmyFriends,
	        
	    };
	 
	    return factory;

	    function listFriends(userId) {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI+userId) 
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching jobs');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	
	    function CreateFriends(friend) {
	        var deferred = $q.defer();
	        $http.post(REST_SERVICE_URI, friend)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while creating friend');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	    
	    function getmyFriends(username) {
	        var deferred = $q.defer();
	        $http.post('http://localhost:8081/CollaborationPortal/myfriends/'+username)
	            .then(
	            function (response) {
	                deferred.resolve(response.data);
	            },
	            function(errResponse){
	                console.error('Error while fetching my friends');
	                deferred.reject(errResponse);
	            }
	        );
	        return deferred.promise;
	    }
	 
	 
	    
}]);