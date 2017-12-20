(function() {
    'use strict';
    angular.module('hireandhire').component('userProfile', {
        templateUrl: '/components/user-profile/user-profile-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = [];

    function ControllerController() {
        var vm = this;

        vm.shit = 1;

        init();

        function init() {}
    }
})();
