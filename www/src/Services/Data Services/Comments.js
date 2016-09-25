var Firebase = require('firebase');
var Comments = function (Likes) {

    this.sendComment = function (scope, newData, commentList) {
        var newPostKey = Firebase.database().ref().child('Commenti').push().key;
        var updates = {};
        document.getElementById(commentList).style.display = 'none';
        updates['/Commenti/' + newPostKey] = newData;
        Firebase.database().ref().update(updates)
            .then(function () {
                document.getElementById(commentList).style.display = 'block';
                scope.$apply();
            })
    };

    this.getComments = function (scope, rootScope, state, spinner, filter) {
        if (filter == undefined) {
            filter = true;
        }
        document.getElementById(spinner).style.display = 'block';
        var comments = [];
        scope.Comments = [];
        var father = rootScope.currentPost;
        var ModelRef = Firebase.database().ref('Commenti');
        ModelRef.on('value', function (snapshot) {
            var results = snapshot.val();

            if (results != null) {
                Object.keys(results).map(function (item) {
                    if (!filter) {
                        comments.push({
                            author: results[item].author,
                            text: results[item].comment,
                            father: results[item].father,
                            date: results[item].date,
                            id: item
                        });
                        Likes.getLikeCount(item, scope, comments, comments.length - 1, 'Comments');
                    } else if (results[item].father == father) {
                        comments.push({
                            author: results[item].author,
                            text: results[item].comment,
                            father: results[item].father,
                            date: results[item].date,
                            id: item,
                            like: function () {
                                Likes.checkLike(Firebase.auth().currentUser.displayName, item);
                            },
                            link: function () {
                                rootScope.currentPost = item;
                                state.go('likes');
                            }
                        });

                        document.getElementById(spinner).style.display = 'none';
                        Likes.getLikeCount(item, scope, comments, comments.length - 1, 'Comments');
                    }


                });
            }

            document.getElementById(spinner).style.display = 'none';
        });
    };

    this.getCommentCount = function (father, scope, posts, index, maxLength) {
        var ModelRef = Firebase.database().ref('Commenti');
        ModelRef.on('value', function (snapshot) {
            var results = snapshot.val();
            var count = 0;

            if (results != null) {

                Object.keys(results).map(function (item) {
                    if (results[item].father == father) {
                        count++;
                    }
                });
            }
            posts[index].commentCount = count;
            Likes.getLikeCount(father, scope, posts, index, 'Posts', maxLength);
        });

    };

    this.deleteComment = function (scope, commentId, commentList, modals) {
        var oldLenght = scope.Comments.length;
        document.getElementById(commentList).style.display = 'none';
        firebase.database().ref('Commenti/' + commentId).remove()
            .then(function () {
                modals.ResultTemplate('commento eliminato con successo');
                scope.Comments.splice(oldLenght - 1, oldLenght * 2);
                document.getElementById(commentList).style.display = 'block';
                scope.$apply();
            });
    }
};

module.exports = Comments;