(function() {
    'use strict';
    angular.module('hireandhire').component('home', {
        templateUrl: '/components/home/home-component.html',
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
