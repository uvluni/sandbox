(function() {
    'use strict';
    angular.module('hireandhire').component('login', {
        templateUrl: '/components/login/login.html',
        controller: ControllerController,
        controllerAs: 'vm',
        bindings: {}
    });

    ControllerController.$inject = ['$state', 'loginService'];

    function ControllerController($state, loginService) {
        var vm = this;
        vm.invalidUser = true;

        vm.loggedIn = loggedIn;

        function loggedIn() {
            loginService.validateUser(vm.email, vm.password).then(function(user) {
                // user ? $state.go('home') : alert('Wrong username or password');
                user ? $state.go('home') : (vm.invalidUser = false);
            });
        }
    }
})();
