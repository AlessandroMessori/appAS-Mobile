var tabsCtrl = function ($scope, $ionicTabsDelegate, $ionicLoading, $window, $state) {

    $scope.checkadmin = function () {

        if (Parse.User.current()) {
            if (Parse.User.current().get("isadmin")) {
                return "ng-show";
            } else {
                return "ng-hide";
            }
        }
    };

    $scope.Disconnect = function () {
        $ionicLoading.show({
            template: 'Disconnessione in corso...'
        });
        //Logout($ionicLoading,$state);
        $state.go('tab.link');
        $window.localStorage.setItem("RememberMe", "false");
    }

};

module.exports = tabsCtrl;