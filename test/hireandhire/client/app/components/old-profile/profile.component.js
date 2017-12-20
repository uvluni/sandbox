(function() {
    'use strict';
    angular.module('hireandhire').component('profile', {
        templateUrl: '/components/profile/profile.html',
        controller: Controller,
        controllerAs: 'vm',
        bindings: {}
    });

    Controller.$inject = ['$rootScope', '$state', 'localStorageService', 'profileService'];

    function Controller($rootScope, $state, localStorageService, profileService) {
        var vm = this;
        vm.reverse = true;
        vm.propertyName = 'publish_date';

        profileService.appliedJobsByUserId(callback, 'jobsObj', localStorageService.get('userId'));

        function callback(response, where) {
            vm[where] = response.data;
            // addSkillsToJob();
        }

        vm.sortBy = function(propertyName) {
            vm.reverse = vm.propertyName === propertyName ? !vm.reverse : false;
            vm.propertyName = propertyName;
        };
    }
})();
