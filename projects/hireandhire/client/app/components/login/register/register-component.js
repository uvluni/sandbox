(function() {
    'use strict';
    angular.module('hireandhire').component('register', {
        templateUrl: '/components/login/register/register-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = ['loginService'];

    function ControllerController(loginService) {
        var vm = this;
        vm.showModal = showModal;
        vm.hideModal = hideModal;
        vm.addUser = addUser;

        vm.user = { name: {}, location: {}, description: {} };

        function init() {}

        function showModal() {
            vm.modalActive = 'is-active';
        }

        function hideModal() {
            vm.modalActive = '';
        }

        function addUser() {
            loginService.addUser(vm.user).then(msg => {
                if (msg.data.error) {
                    vm.message = 'Email already in use';
                } else {
                    vm.message = 'Successful registration';
                }
            });
            hideModal();
            vm.user = { name: {}, location: {}, description: {} };
        }

        init();
    }
})();
