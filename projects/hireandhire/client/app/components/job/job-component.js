(function() {
    'use strict';

    angular.module('hireandhire').component('job', {
        templateUrl: '/components/job/job-component.html',
        controller: ControllerController,
        controllerAs: 'vm',
        bindings: {
            job: '<',
            btnName: '<',
            details: '<',
            clickFunc: '&'
        }
    });

    ControllerController.$inject = ['jobsListService'];

    function ControllerController(jobsListService) {
        var vm = this;
        vm.btnClicked = false;
        vm.showDetails = false;
        vm.btnClick = btnClick;
        vm.detailsClicked = detailsClicked;

        ////////////////

        function btnClick() {
            vm.btnClicked = true;
        }

        function detailsClicked() {
            // console.log('click');
            vm.showDetails = !vm.showDetails;
            vm.details = jobsListService.getJobDetails(vm.job._id);
        }
    }
})();
