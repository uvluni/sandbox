(function() {
    'use strict';

    angular.module('hireandhire').component('mainNav', component());

    function component() {
        function componentController(localStorageService, $state, $rootScope, $scope) {
            var vm = this;

            $rootScope.$on('loggedIn', () => {
                vm.username = 'Hello ' + localStorageService.get('name');
            });

            vm.logout = function() {
                localStorageService.clearAll();
                vm.username = '';
                $state.go('login');
            };

            vm.checkLoggedIn = function() {
                if (localStorageService.get('userId')) {
                    vm.username = 'Hello ' + localStorageService.get('name');
                } else {
                    vm.username = '';
                }
            };

            function init() {
                vm.checkLoggedIn();
            }

            $scope.$on('userLoggedIn', function() {
                vm.checkLoggedIn();
            });

            init();
        }

        return {
            bindings: {},
            controller: [
                'localStorageService',
                '$state',
                '$rootScope',
                '$scope',
                componentController
            ],
            controllerAs: 'vm',
            templateUrl: '/components/nav/main-nav.html'
        };
    }
})();
