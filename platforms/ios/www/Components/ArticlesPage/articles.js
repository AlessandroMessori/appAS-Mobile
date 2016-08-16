var mod = angular.module('appAS.controllers', ['ionic'])
var articlesCtrl = mod.controller('articlesCtrl', function ($scope, $state, $window) {

    $scope.$on('$ionicView.enter', function () {
        if ($scope.Articles != getArticles($state, $window, "Article")) { $scope.doRefresh(); }
    });

    $scope.Articles = getArticles($state, $window, "Article");

    $scope.doRefresh = function () {
        $scope.Articles = getArticles($state, $window, "Article");
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
    };

});

module.exports = articlesCtrl;