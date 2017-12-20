(function() {
    'use strict';
    angular.module('hireandhire').component('skillsSearch', {
        templateUrl: '/components/skills-search/skills-search-component.html',
        controller: ControllerController,
        controllerAs: 'vm'
    });

    ControllerController.$inject = ['jobsListService'];

    function ControllerController(jobsListService) {
        var vm = this;

        // var skills = document.getElementById('skills');

        init();

        function init() {
            jobsListService.getSkills().then(skills => {
                vm.allSkills = skills.data;
            });
        }
    }
})();
