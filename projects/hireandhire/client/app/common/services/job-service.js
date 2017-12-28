(function() {
    'use strict';

    angular.module('hireandhire').factory('jobsListService', Service);

    Service.$inject = ['$http', 'API'];

    function Service($http, API) {
        var service = {};
        // service.allJobs = [];
        service.allJobsRaw;

        service.getJobs = function() {
            service.allJobs = [];
            return $http.get(`${API.URL}/job`).then(jobs => {
                digestJobsList(jobs.data);
            });
        };

        service.deleteJob = function(jobId) {
            return $http.get(`${API.URL}/job/delete/${jobId}`).then(job => {
                console.log(job);
            });
        };

        service.getJobDetails = function(jobId) {
            let digestedJob;
            service.allJobsRaw.forEach(function(job) {
                if (job._id === jobId) {
                    digestedJob = digestJobDetails(job);
                    return digestedJob;
                }
            });
            return digestedJob;
        };

        service.getJobsApplicant = function(applicantId) {
            service.allJobs = [];
            service.publishedJobs = [];

            return $http.get(`${API.URL}/job/applicant/${applicantId}`).then(jobs => {
                digestJobsList(jobs.data);
            });
        };

        service.getPublishedJobs = function(pubId) {
            return getEmailById(pubId).then(user => {
                let email = user.data.user[0].email;

                return $http.get(`${API.URL}/user/jobs/${email}`).then(jobs => {
                    digestPublishedJobs(jobs.data);
                });
            });
        };

        function getEmailById(userId) {
            let body = `{
                "array": ["${userId}"]
            }`;
            return $http.post(`${API.URL}/user/emailbyid`, body).then(email => {
                return email;
            });
        }

        function digestJobsList(jobs) {
            service.allJobsRaw = jobs;
            jobs.forEach(function(job) {
                let cell = {
                    Title: job.title,
                    ['Date']: new Date(job.publishedDate).toDateString(),
                    Description: job.description
                };

                Object.defineProperty(cell, '_id', {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: job._id
                });

                service.allJobs.push(cell);
            });
        }

        function digestPublishedJobs(jobs) {
            jobs.forEach(function(job) {
                let cell = {
                    Title: job.title,
                    ['Date']: new Date(job.publishedDate).toDateString(),
                    Description: job.description
                };

                Object.defineProperty(cell, '_id', {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: job._id
                });

                service.publishedJobs.push(cell);
            });
        }

        function digestJobDetails(job) {
            let jobDetails = {
                description: `Job description: ${job.description}`,
                skills: `Skills needed: ${job.skills}`
            };
            return jobDetails;
        }

        service.applyJob = function(jobId, userId) {
            let body = {
                jobId: jobId,
                applicantId: userId
            };

            return $http.post(`${API.URL}/job/apply`, body).then(jobsObj => {
                return jobsObj;
            });
        };

        service.removeApplyJob = function(jobId, userId) {
            let body = {
                jobId: jobId,
                applicantId: userId
            };

            console.log('body:', JSON.toString(body));

            return $http.post(`${API.URL}/job/unapply`, body).then(jobsObj => {
                return jobsObj;
            });
        };

        service.getSkills = function() {
            return $http.get(`${API.URL}/skill`).then(skills => {
                return skills;
            });
        };

        service.addJob = function(pubId, job) {
            return getEmailById(pubId).then(user => {
                let email = user.data.user[0].email;
                let skills = [];
                skills.push(job.skill.title);

                let body = {
                    title: job.title,
                    email: email,
                    skills: skills,
                    description: job.description,
                    location: job.location
                };

                return $http.post(`${API.URL}/job`, body).then(jobsObj => {
                    return jobsObj;
                });
            });
        };
        return service;
    }
})();
