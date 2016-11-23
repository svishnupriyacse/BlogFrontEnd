'use strict';
 
angular.module('app').factory('Commentservice', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8081/CollaborationPortal/comments/';
 
    var factory = {
            fetchAllComments: fetchAllComments,
            CreateComment: CreateComment,
           // updateComment:updateComment,
            //deleteComment:deleteComment
        };
     
        return factory;
    
    
        function fetchAllComments() {
            var deferred = $q.defer(); 
            $http.get(REST_SERVICE_URI)
                .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching comments');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }
        
        function CreateComment(comment) {
            var deferred = $q.defer();
            $http.post(REST_SERVICE_URI, comment)
                .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while creating Forums');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }
     
     
    
}]);