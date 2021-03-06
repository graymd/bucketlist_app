(function () {
    "use strict";
    angular.module('interests')
    .controller('UserController', ['UserService', '$location', '$routeParams', '$scope', '$rootScope', 'Auth', function (UserService, $location, $routeParams, $scope, $rootScope, Auth) {

       var user = this;

      Auth.currentUser().then(function(user) {
        $rootScope.currentUser = user

      });

      UserService.getUserBucket($routeParams.userId).success(function(data){
        user.userData = data;
    });

      UserService.getCompletedItems($routeParams.userId).success(function(data){

        $scope.userCompleted = data;
      });


      $scope.$on('BasketItem:completed', function(){
      UserService.getCompletedItems($routeParams.userId).success(function(data){
          console.log('working')
        $scope.userCompleted = data;

    });

});

       user.addUserBucket = function (item) {
           $rootScope.currentUser.bucket_list_items.push(item);
           UserService.addUserBucket($rootScope.currentUser);
           $location.path('/users/' + $rootScope.currentUser.id);
       };

       user.removeBucketItem = function (item) {
           UserService.removeBucketItem(item, user.userData);
       };

       user.submitBucket = function (item) {
           UserService.addUserBucket($rootScope.currentUser);
           // console.log('submit button works')
       };

       user.goToBucket = function(id){
        $location.path('/users/' + $rootScope.currentUser.id);
       }

       user.userItemCompleted = function(bucketItem){
          var itemCompleteHash = {};
          var itemComplete = {}
          itemComplete.completed = true
          itemCompleteHash.bucket_list_item_id = bucketItem.id;
          itemCompleteHash.item_complete = itemComplete;
          itemCompleteHash.user_id = $rootScope.currentUser.id;
          console.log('completeHash ' + itemCompleteHash.user_id)
          UserService.itemComplete(itemCompleteHash, $scope.userCompleted, bucketItem);

       };

       user.completedBucketItems = function(){
        UserService.getCompletedItems($rootScope.currentUser);
        var completes = $rootScope.currentUser.bucket_list_items.item_completes;
        console.log(completes)
       };

    }]);

})();
