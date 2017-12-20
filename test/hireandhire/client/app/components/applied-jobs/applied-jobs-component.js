(function() {
    'use strict';
    angular.module('hireandhire').component('appliedJobs', {
        templateUrl: '/components/applied-jobs/applied-jobs-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = ['jobsListService', 'localStorageService', '$state', '$rootScope'];

    function ControllerController(jobsListService, localStorageService, $state, $rootScope) {
        var vm = this;
        vm.cancelApplication = cancelApplication;
        let userId = localStorageService.get('userId');

        function init() {
            jobsListService.getJobsApplicant(userId).then(jobs => {
                vm.allJobs = jobsListService.allJobs;
                if (vm.allJobs.length) {
                    vm.titles = Object.keys(vm.allJobs[0], 1);
                }
            });
        }

        function cancelApplication(jobId) {
            jobsListService.removeApplyJob(jobId, userId).then(() => {
                init();
            });
        }

        init();
    }
})();
