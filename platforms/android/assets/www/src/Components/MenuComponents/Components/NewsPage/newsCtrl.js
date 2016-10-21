import Firebase from "firebase";

class forumCtrl {
    static create($scope, $rootScope, $state, $ionicLoading, Messages, FileHandler, type) {

        $rootScope.userName = window.localStorage.getItem("Username");
        Messages.getPosts($scope, $rootScope, $state, "newsSpinner", type);

        $scope.doRefresh = () => {
            Messages.getPosts($scope, $rootScope, $state, "newsSpinner", type);
            $scope.$broadcast("scroll.refreshComplete");
            $scope.$apply();
        };

        $scope.$on("$ionicView.enter", () => {
            $scope.UserImage = Firebase.auth().currentUser.photoURL;
            $scope.$apply();
            if ($rootScope.userName != window.localStorage.getItem("Username")) {
                Messages.getPosts($scope, $rootScope, $state, "newsSpinner", type);
                $rootScope.userName = window.localStorage.getItem("Username");
            }
        });

        $scope.openFile = (file) => {
            FileHandler.openFile(file, $ionicLoading);
        };
    }
}

export const newsCtrl = ($scope, $rootScope, $state, $ionicLoading, Messages, FileHandler) => {
    return forumCtrl.create($scope, $rootScope, $state, $ionicLoading, Messages, FileHandler, "Comunicazioni");
};

export const freeZoneCtrl = ($scope, $rootScope, $state, $ionicLoading, Messages, FileHandler) => {
    return forumCtrl.create($scope, $rootScope, $state, $ionicLoading, Messages, FileHandler, "Post");
};

