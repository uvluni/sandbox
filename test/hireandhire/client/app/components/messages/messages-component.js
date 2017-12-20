(function() {
    'use strict';

    angular.module('hireandhire').component('messages', {
        templateUrl: './components/messages/messages-component.html',
        controller: ControllerController,
        controllerAs: 'vm',
        bindings: {
            message: '='
        }
    });
    ControllerController.$inject = ['$scope'];
    function ControllerController($scope) {
        var vm = this;
        vm.activate = '';
        vm.close = close;
        $scope.$watch('vm.message', function() {
            if (vm.message) {
                vm.activate = 'is-active';
            }
        });
        function close() {
            vm.activate = '';
            vm.message = '';
        }
        ////////////////
    }
})();
