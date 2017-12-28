(function() {
    'use strict';

    angular.module('hireandhire').component('jobDetails', {
        templateUrl: '/components/job-details/job-details-component.html',
        controller: ControllerController,
        controllerAs: 'vm',
        bindings: {
            // job: '<',
            // btnName: '<',
            // clickFunc: '&',
            // detailsClicked: '<',
            details: '<'
        }
    });

    // ControllerController.$inject = [];

    function ControllerController() {
        var vm = this;
        // vm.btnClicked = false;
        // vm.clicked = clicked;
        ////////////////

        // function clicked() {
        //     vm.btnClicked = true;
        // }
    }
})();
