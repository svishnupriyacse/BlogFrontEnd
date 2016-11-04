'use strict';
 
angular.module('app').factory('FriendService', ['$http', '$q', function($http, $q){
	
	 var REST_SERVICE_URI = 'http://localhost:8081/CollaborationPortal/customers/';
	 
	 var REST_SERVICE_URI_Friend = 'http://localhost:8081/CollaborationPortal/customers/';
	 
	    var factory = {
	        fetchAllUsers: fetchAllUsers,
	        fetchAllFriends: fetchAllFriends,
	        
	    };
	 
	    return factory;

	    function fetchAllUsers() {
	        var deferred = $q.defer();
	        $http.get(REST_SERVICE_URI) 
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
	
	    function fetchAllFriends() {
	    	
	    }
	    
}]);