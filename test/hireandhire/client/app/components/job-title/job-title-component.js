(function() {
    'use strict';

    angular.module('hireandhire').component('jobTitle', {
        templateUrl: '/components/job-title/job-title.html',
        controller: ControllerController,
        controllerAs: 'vm',
        bindings: {
            titles: '<',
            hideFiled: '<',
            order: '=',
            reverse: '='
        }
    });

    function ControllerController() {
        var vm = this;

        vm.reverse = true;
        vm.order = 'date';

        vm.sortBy = function(propertyName) {
            vm.reverse = vm.order === propertyName ? !vm.reverse : false;
            vm.order = propertyName;
        };

        ////////////////
    }
})();
