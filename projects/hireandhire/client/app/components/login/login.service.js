(function() {
    'use strict';

    angular.module('hireandhire').factory('loginService', Service);

    Service.$inject = ['$http', 'API', '$rootScope', 'localStorageService'];

    function Service($http, API, $rootScope, localStorageService) {
        var service = {};
        service.validateUser = validateUser;
        service.addUser = addUser;

        return service;

        ////////////////

        function validateUser(email, password) {
            let body = {
                email: email,
                password: password
            };
            return $http.post(`${API.URL}/user/validate`, body).then(userObj => {
                if (userObj.data) {
                    updateLocalStorage(userObj.data);
                    $rootScope.$broadcast('loggedIn');
                }
                return userObj.data;
            });

            function updateLocalStorage(userObj) {
                localStorageService.set('userId', userObj._id);
                var fullName = userObj.name.first + ' ' + userObj.name.last;
                localStorageService.set('name', fullName);
            }
        }

        function addUser(user) {
            return $http.post(`${API.URL}/user`, user);
        }
    }
})();
