'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location,$state) {

    $scope.submit = function() {
        $scope.$state = $state;
        $state.transitionTo('connectaccounts', {arg:'arg'});
      //$location.path('/dashboard/overview');


      return false;
    }


  });
