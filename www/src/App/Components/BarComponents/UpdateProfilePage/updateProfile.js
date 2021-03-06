import Firebase from  "firebase";

class updateProfileCtrl {

    constructor($scope, $rootScope, Profile, Users, CameraHandler, PlatformHandler) {

        $scope.$on("$ionicView.enter", () => {

            PlatformHandler.is("iOS", () => document.getElementById("updateProfileSection").style.marginTop = "5%");

            $scope.profileImage = $rootScope.currentProfile.avatar;
            $scope.userName = $rootScope.currentProfile.name;
            $scope.userMail = $rootScope.currentProfile.mail;
            let profileUser = "";

            if ($rootScope.profileUpdatable) {
                profileUser = Firebase.auth().currentUser;
            }
            else {
                profileUser = {email: $scope.userMail};
            }

            Users.GetUserData(profileUser, user => {
                $scope.userClass = user.cls;
                $scope.userID = user.number;
                $scope.userSection = user.sect;
                $scope.$apply();
            });
        });

        $scope.getPic = () => {
            if ($rootScope.profileUpdatable) {
                CameraHandler.getPic((imgUrl) => {
                    document.getElementById("profileImg").src = imgUrl;
                    Profile.updateProfile(imgUrl);
                });
            }
        };

    }

}

export default updateProfileCtrl;