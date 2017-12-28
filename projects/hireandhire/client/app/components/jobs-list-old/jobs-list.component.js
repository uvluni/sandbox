(function() {
    //d
    'use strict';

    angular.module('hireandhire').component('jobsList', component());

    function component() {
        function componentController(
            jobsListService,
            $rootScope,
            $log,
            $state,
            localStorageService
        ) {
            var vm = this;

            vm.reverse = true;
            vm.propertyName = 'publish_date';
            var skills = document.getElementById('skills');

            function init() {
                jobsListService.getJobs(callback, 'jobsObj');
                jobsListService.getAllSkills(cbGetAllSkills, 'allSkills');

                if (!localStorageService.get('token')) {
                    return ($rootScope._currentUser = null);
                }

                return ($rootScope._currentUser = {
                    token: localStorageService.get('token')
                });
            }

            $rootScope.$on('loggedIn', () => {
                console.log(vm.apply);
                vm.apply = true;
            });

            function callback(response, where) {
                vm[where] = response.data;
                addSkillsToJob();
                // skills.firstChild.value = "hhhhhh";
            }

            function addSkillsToJob() {
                jobsListService.getSkillsForAllJobs(callbackSkills);
            }

            function callbackSkills(response) {
                response.forEach(function(skill) {
                    vm.jobsObj.forEach(function(job) {
                        if (!job.skills) {
                            job.skills = [];
                        } else if (job.id === skill.job_id) {
                            job.skills.push(skill.skill_name);
                        }
                    });
                });
            }

            function cbGetAllSkills(response, where) {
                vm[where] = response.data;
            }

            vm.getSkillsByJobId = function(id) {
                var where = 'skills' + id;
                if (!vm[where]) {
                    jobsListService.getSkillByJobId(callback, where, id);
                }
            };

            vm.sortBy = function(propertyName) {
                vm.reverse = vm.propertyName === propertyName ? !vm.reverse : false;
                vm.propertyName = propertyName;
            };

            vm.applyByJobAndUserId = function(job_id, user_id) {
                var userId = localStorageService.get('userId');
                if (userId) {
                    jobsListService.applyByJobAndUserId(job_id, userId, cbAlreadyApplied);
                } else {
                    $state.go('login');
                }
            };

            function cbAlreadyApplied(response) {
                if (response.data) {
                    // console.log(vm);
                } else {
                    // console.log(vm);
                }
            }

            init();
        }

        return {
            bindings: {},
            controller: [
                'jobsListService',
                '$rootScope',
                '$log',
                '$state',
                'localStorageService',
                componentController
            ],
            controllerAs: 'vm',
            templateUrl: '/components/jobs-list/jobs-list.html'
        };
    }
})();
