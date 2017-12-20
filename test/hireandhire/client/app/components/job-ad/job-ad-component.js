(function() {
    'use strict';
    angular.module('hireandhire').component('jobAd', {
        templateUrl: '/components/job-ad/job-ad-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = [];

    function ControllerController() {
        var vm = this;

        init();

        function init() {}
    }
})();
