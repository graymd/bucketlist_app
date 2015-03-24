(function () {
    "use strict";
    angular.module('interests')
    .controller('BucketController', ['BucketService', '$location', '$routeParams', 'Auth', '$scope', function (BucketService, $location, $routeParams, Auth, $scope) {

      var bucketCtrl = this;

      BucketService.getBucketItems().success(function(data) {
           bucketCtrl.items = data;
      });

    //   BucketService.getSingleBucket(itemId).success(function(data){
    //       bucketCtrl.singleBucket = data;
    //   })

      Auth.currentUser().then(function(user) {
        $scope.currentUser = user
      });

      bucketCtrl.addNewBucketItem = function (item) {
          BucketService.addNewBucketItem(item);
          $location.path('/bucketlistitem');
          console.log(item);
       };

      bucketCtrl.addItemToUserBucket = function(bucket){
          BucketService.addToUserBucket(bucket);

       };

       bucketCtrl.addUserBucketArray = function (){
          console.log($scope.currentUser);
          BucketService.addArrayToUserBucket($scope.currentUser);
            $location.path('/users/' + $scope.currentUser.id);
       };

       bucketCtrl.editNewBucketItem= function(item) {
           BucketService.editNewBucketItem(item, $routeParams.itemId);
           console.log(item);
           console.log($routeParams);
           $location.path('/bucketlistitem');
       };

       bucketCtrl.removeBucketItem = function (item, itemArray) {
           BucketService.removeBucketItem(item, itemArray);
           
       };

       bucketCtrl.goToBucketPage = function () {
           $location.path('/userBucket');
           console.log('userBucket works');
       };

       bucketCtrl.goToBucketDetail = function(id){
           $location.path('/bucket_list_items/' + id);
           console.log(id)
       };

    }]);

})();
