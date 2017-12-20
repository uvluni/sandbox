(function() {
    'use strict';

    angular.module('hireandhire').factory('jobsListService', Service);

    Service.$inject = ['$http'];

    function Service($http) {
        var service = {};

        service.getJobs = function(callback, where) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/jobs'
            }).then(
                function successCallback(response) {
                    callback(response, where);
                },
                function errorCallback(response) {
                    if (response) {
                        throw response;
                    }
                }
            );
        };

        service.getSkillsForAllJobs = function(callback) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/skillsjobs'
            }).then(
                function successCallback(response) {
                    callback(response.data);
                },
                function errorCallback(response) {
                    if (response) {
                        throw response;
                    }
                }
            );
        };

        service.getAllSkills = function(callback, where) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/skills'
            }).then(
                function successCallback(response) {
                    callback(response, where);
                },
                function errorCallback(response) {
                    if (response) {
                        throw response;
                    }
                }
            );
        };

        service.applyByJobAndUserId = function(job_id, user_id, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/applybyjobanduserid',
                data: {
                    job_id: job_id,
                    user_id: user_id
                }
            }).then(
                function successCallback(response) {
                    callback(response);
                },
                function errorCallback(response) {
                    if (response.data) {
                        // throw response;
                        console.log('Insert Failed');
                        callback();
                    }
                }
            );
        };

        service.getSkillByJobId = function(callback, where, jobId) {
            // OLD
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/skills/' + jobId
            }).then(
                function successCallback(response) {
                    callback(response, where);
                },
                function errorCallback(response) {
                    if (response) {
                        throw response;
                    }
                }
            );
        };

        service.getJobById = function(callback, where, jobId) {
            // OLD
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/job/' + jobId
            }).then(
                function successCallback(response) {
                    callback(response, where);
                },
                function errorCallback(response) {
                    if (response) {
                        throw response;
                    }
                }
            );
        };

        return service;
    }
})();
