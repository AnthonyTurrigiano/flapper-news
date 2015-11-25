angular.module('flapperNews', ['ui.router'])

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  
$scope.posts = posts.posts;

$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0
  });
  $scope.title = '';
  $scope.link = '';
};

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};


}]);// end MainCtrl


app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);// end posts factory

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);// end config

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){

    //dummy comments data
  $scope.posts.push({
  title: $scope.title,
  link: $scope.link,
  upvotes: 0,
  comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  ]
});

$scope.post = posts.posts[$stateParams.id];
$scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};

}]);//end posts ctrl
