'use strict';

angular.module('salesOrderReviewApp', ['ngResource','ng-intalio']);
angular.module('salesOrderReviewApp').filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);
angular.module('salesOrderReviewApp').controller('taskController', ['$scope','intalio', function($scope,intalio){
  $scope.decisionOptions = [
    {label: 'Approve', value:'Approve'},
    {label: 'Return', value:'Return'},
    {label: 'Reject', value:'Reject'},
  ];
  $scope.result = $scope.decisionOptions[0];
  $scope.submit = function(){
    $scope.working = true;
    $scope.data.SalesOrderReview.Decision.$=$scope.result.value;
    intalio.completeTask($scope.data).then(function(){
      // 
    },
    function(err){
      $scope.working = false;
      console.log(err);
    });
  };
  $scope.decisionChanged = function(opt){
    $scope.result = opt;
  };
  intalio.getTask().then(function(d) {
    $scope.data = d;
    $scope.itemsArray = angular.isArray($scope.data.SalesOrderReview.SalesOrder.Items);
    $scope.data.SalesOrderReview.Decision.$ = $scope.decisionOptions[0];
  });
 
}]);
