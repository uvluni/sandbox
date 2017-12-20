(function() {
    'use strict';
    angular.module('hireandhire').component('profile', {
        templateUrl: '/components/profile/profile-component.html',
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
