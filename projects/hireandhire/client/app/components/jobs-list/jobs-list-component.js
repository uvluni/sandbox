(function() {
    'use strict';
    angular.module('hireandhire').component('jobsList', {
        templateUrl: '/components/jobs-list/jobs-list-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = [
        'jobsListService',
        'localStorageService',
        '$state',
        '$rootScope'
    ];

    function ControllerController(jobsListService, localStorageService, $state, $rootScope) {
        var vm = this;
        vm.applyJob = applyJob;
        vm.getJobDetails = getJobDetails;

        function init() {
            jobsListService.getJobs().then(() => {
                vm.allJobs = jobsListService.allJobs;
                vm.titles = Object.keys(vm.allJobs[0], 1);
            });
        }

        function applyJob(jobId) {
            var userId = localStorageService.get('userId');
            if (userId) {
                jobsListService.applyJob(jobId, userId).then(job => {
                    if (job.data.nModified == 0) {
                        alert('You have already applied for this job in the past');
                    } else {
                        alert('Applied');
                    }
                });
            } else {
                $state.go('login');
            }
        }

        function getJobDetails(jobId) {
            console.log('getJobDetails - jobs-list');
            console.log(jobsListService.getJobDetails(jobId));
            vm.jobDetails = jobsListService.getJobDetails(jobId);
            // jobsListService.getJobDetails(jobId).then(() => {
            //     console.log(jobId);
            //     vm.jobDetails = jobsListService.jobDetails;
            // });
        }

        init();
    }
})();
