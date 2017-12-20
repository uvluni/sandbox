(function() {
    'use strict';
    angular.module('hireandhire').component('publishedJobs', {
        templateUrl: '/components/published-jobs/published-jobs-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = ['jobsListService', 'localStorageService', '$state', '$rootScope'];

    function ControllerController(jobsListService, localStorageService, $state, $rootScope) {
        var vm = this;
        vm.cancelJob = cancelJob;
        let userId = localStorageService.get('userId');

        function init() {
            jobsListService.getPublishedJobs(userId).then(jobs => {
                vm.allJobs = jobsListService.publishedJobs;
                vm.titles = Object.keys(vm.allJobs[0], 1);
            });
        }

        function cancelJob(jobId) {
            jobsListService.deleteJob(jobId).then(() => {});
        }

        function cancelApplication(jobId) {
            jobsListService.removeApplyJob(jobId, userId).then(() => {
                init();
            });
        }

        init();
    }
})();
