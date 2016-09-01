var Firebase = require('firebase');
var Auth = function () {

    this.Signup = function (name, pass, mail, loadingtemplate, state, history) {

        Firebase.auth().createUserWithEmailAndPassword(mail, pass).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            loadingtemplate.hide();
            alert(errorMessage);
        });

        Firebase.auth().onAuthStateChanged(function (user) {

            if (user != null && history.currentStateName() == 'signup') {
                user.updateProfile({displayName: name});
                loadingtemplate.hide();
                Firebase.auth().signOut();
                alert('profilo creato con successo');
                state.go('login');
            }

        });

    };

    this.Login = function (email, pass, loadingtemplate, state, history) {

        Firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
            //var errorCode = error.code;
            alert(error.message);
            loadingtemplate.hide();
        });

        Firebase.auth().onAuthStateChanged(function (user) {

            if (user != null && history.currentStateName() == 'login') {
                loadingtemplate.hide();
                state.go("tab.link");
            }

        });
    };

    this.Logout = function (loadingtemplate, state) {
        Firebase.auth().signOut().then(function () {
            state.go('login');
            loadingtemplate.hide();
        }, function (error) {
            loadingtemplate.hide();
            alert('impossibile disconnetersi dal profilo');
        });
    };

};

module.exports = Auth;
