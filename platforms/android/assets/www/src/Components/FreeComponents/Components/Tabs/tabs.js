import Firebase from "firebase";

class tabsCtrl {

    constructor($scope, $state, $rootScope, $ionicPlatform, $ionicScrollDelegate, $ionicHistory, Auth, PlatformHandler) {

        $scope.View = "tab-link";
        $scope.showIcon = "ion-plus-round";
        $scope.UserImage = JSON.parse(localStorage.getItem("firebase:authUser:AIzaSyBQcIrRUzpahFxeh3s3pzGNlP8QqyFsvn8:[DEFAULT]")).photoURL;

        Auth.checkAdmins($scope, "adminPanel");

        PlatformHandler.is("iOS", ()=> document.getElementById("tabBar").style.marginTop = "-5%"
        );

        $scope.$on("$ionicView.enter", () => {
            const user = Firebase.auth().currentUser;
            if (user) {
                $scope.User = user.displayName;
                $scope.UserMail = user.email;
                $scope.UserImage = user.photoURL;
                if (!$scope.UserImage) {
                    $scope.UserImage = "dist/Images/user.png";
                }
                Auth.checkAdmins($scope, "adminPanel");
            }
        });

        $rootScope.$on("$stateChangeSuccess", (ev, to, toParams, from) => {

            $rootScope.previousState = from.name;
            $ionicScrollDelegate.scrollTop();

            if (to.name == "tab.libera") {
                document.getElementById("addIcon").style.display = "block";
            }
            else {
                document.getElementById("addIcon").style.display = "none";
            }

        });

        $scope.backBtnClick = () => $ionicHistory.goBack();

        $scope.ShowLinks = () => {
            if (document.getElementById("linkList").style.display == "block") {
                document.getElementById("linkList").style.display = "none";
                $scope.showIcon = "ion-plus-round";
            }
            else {
                document.getElementById("linkList").style.display = "block";
                $scope.showIcon = "ion-minus-round";
            }
        };

        $scope.navigate = (destination) => {
            $scope.View = "tab-" + destination;
            const views = document.querySelectorAll(".nav-view");
            for (let i = 0; i < views.length; i++) {
                views[i].style.display = "none";
            }
            document.getElementById(destination + "-view").style.display = "block";
        };

        $scope.goToPublisher = function () {
            if ($ionicHistory.currentView().stateName == "tab.libera") {
                $state.go("sendMessage");
                $rootScope.contentType = "Post";
            }
        };

        $scope.goToProfile = () => {

            let avatar = Firebase.auth().currentUser.photoURL;

            if (avatar == undefined) {
                avatar = "dist/Images/user.png";
            }

            $rootScope.currentProfile = {
                name: Firebase.auth().currentUser.displayName,
                avatar,
                mail: Firebase.auth().currentUser.email
            };
            $rootScope.profileUpdatable = true;
            $state.go("updateProfile");
        };

        /*$ionicPlatform.registerBackButtonAction(e=> {
         e.preventDefault();
         $ionicHistory.goBack();
         return false;
         }, 101);*/
    }

}


export default tabsCtrl;