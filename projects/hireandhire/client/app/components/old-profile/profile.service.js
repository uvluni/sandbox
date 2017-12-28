(function () {
    'use strict';

    angular.module('hireandhire').factory('profileService', Service);

    Service.$inject = ['$http'];

    function Service($http) {
        var service = {};

        service.appliedJobsByUserId = function (callback, where, userId) {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/appliedbyuser/' + userId
            }).then(
                function successCallback(response) {
                    callback(response, where);
                },
                function errorCallback(response) {
                    if (response) {
                        throw response;
                    }
                }
            );
        };

        return service;
    }
})();