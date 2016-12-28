"use strict";
import Firebase from "firebase";
import includes from "lodash/includes";
import credentials from "../../../../../credentials";

class Notifications {

    get api_url() {
        return "https://fcm.googleapis.com/fcm/send";
    }

    get messaging() {
        return FCMPlugin;
    }

    constructor($http) {
        this.$http = $http;
    }

    getToken(cb) {
        this.messaging.getToken(currentToken => cb(currentToken), err => alert(err));
    }

    getTokensByID(id, cb) {
        const dbRef = Firebase.database().ref();
        const path = "Utenti/" + id + "/tokens";

        dbRef.child(path).once("value", snapshot => {
            const results = snapshot.val();
            cb(results);
        });
    }

    saveToken(token) {
        const dbRef = Firebase.database().ref();
        const user = Firebase.auth().currentUser;
        const path = "Utenti/" + user.uid + "/tokens";
        let updates = {};
        let tokens = [];

        dbRef.child(path).once("value", snapshot => {
            const results = snapshot.val();

            if (results != null && includes(results, token)) {
                return "errore";
            }

            tokens = (results == null) ? [] : results;
            tokens.push(token);
            updates[path] = tokens;
            dbRef.update(updates);

        });
    }

    onMessage(cb) {
        return this.messaging.onNotification(data => cb(data));
    }


    send(to, title, body) {

        this.$http.defaults.headers.common.Authorization = "key=" + credentials.newApiKey;

        this.$http({
            url: this.api_url,
            dataType: "json",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "notification": {
                    "title": title,
                    "body": body,
                    "click_action": "https://dummypage.com"
                },
                "to": to
            }

        }).then(() => console.log("successo"), () => console.log("errore"));
    }

}

export default Notifications;
