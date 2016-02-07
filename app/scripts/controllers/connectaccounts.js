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
            bankName: "Scotiabank",
            accountNum: 1234567891
        };
        $scope.user2={
            userName: "Jason",
            bankName: "TD",
            accountNum: 2234567891
        };
        $scope.user3={
            userName: "Ryan",
            bankName: "BMO",
            accountNum: 1234567891
        };
        $scope.user4={
            userName: "Mike",
            bankName: "RBC",
            accountNum: 4234567891
        };
        $scope.user5={
            userName: "Mike",
            bankName: "CIBC",
            accountNum: 4234567891
        };
        $scope.user6={
            userName: "Mike",
            bankName: "HSBC",
            accountNum: 4234567891
        };

    });