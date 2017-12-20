(function() {
    'use strict';
    angular.module('hireandhire').component('addJob', {
        templateUrl: '/components/add-job/add-job-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = ['loginService', 'jobsListService', 'localStorageService'];

    function ControllerController(loginService, jobsListService, localStorageService) {
        var vm = this;
        vm.showModal = showModal;
        vm.hideModal = hideModal;
        vm.addJob = addJob;
        let userId = localStorageService.get('userId');

        vm.job = { location: {} };

        function init() {
            jobsListService.getSkills().then(skills => {
                vm.allSkills = skills.data;
            });
        }

        function showModal() {
            vm.modalActive = 'is-active';
        }

        function hideModal() {
            vm.modalActive = '';
        }

        function addJob() {
            jobsListService.addJob(userId, vm.job).then(() => {
                vm.job = { location: {} };
            });

            hideModal();
        }

        init();
    }
})();
