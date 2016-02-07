/**
 * Created by McStone on 2016-02-07.
 */
'use strict';
/**
 * Created by McStone on 2016-02-06.
 */
angular.module('yapp')
    .controller('ConnectaccountsCtrl', function($scope,$location,$state) {


        $scope.start =function(){

            $routScope.$state = $state;
            console.log("Test");
            $rootScope.state.transitionTo('overview', {arg:'arg'});
            //$scope.state.transitionTo('overview', {arg:'arg'});

            return false;
        }
        $scope.Name = "Connect Accounts";
        $scope.Pwd = "Choose Preferences";
        $scope.Email = "Debt Timeline";

        $scope.user1={
            userName: "Michael",
            bankName: "ScotiaBank",
            accountNum: 1234567891
        };
        $scope.user2={
            userName: "Jason",
            bankName: "TD",
            accountNum: 2234567891
        };
        $scope.user3={
            userName: "Ryan",
            bankName: "RBC",
            accountNum: 1234567891
        };
        $scope.user4={
            userName: "Mike",
            bankName: "ScotichaBank",
            accountNum: 4234567891
        };

    });