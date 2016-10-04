import addArticleCtrl  from"./Components/AddArticlePage/addArticle";
import addNewsCtrl  from "./Components/AddNewsPage/addNews";
import adminCtrl  from "./Components/AdminPage/admin";
import {attualitaCtrl, orientamentoCtrl} from "./Components/ArticlesPage/articles";
import commentsCtrl from "./Components/CommentsPage/comments";
import conventionsCtrl  from "./Components/ConventionsPage/conventions";
import freeZoneCtrl  from "./Components/FreeZonePage/freeZone";
import libraryCtrl  from "./Components/LibraryPage/library";
import likesCtrl  from "./Components/LikesPage/likes";
import linkCtrl  from "./Components/LinkPage/link";
import loginCtrl  from "./Components/LoginPage/login";
import moderationCtrl  from "./Components/ModerationPage/moderation";
import newsCtrl  from "./Components/NewsPage/newsCtrl";
import settingsCtrl  from "./Components/SettingsPage/settings";
import signupCtrl  from "./Components/SignupPage/signup";
import tabsCtrl  from "./Components/Tabs/tabs";
import updateProfileCtrl from "./Components/UpdateProfilePage/updateProfile";

const Components = angular.module("appAS.components", ["ionic"]);

Components.controller("addArticleCtrl", addArticleCtrl);
Components.controller("addNewsCtrl", addNewsCtrl);
Components.controller("adminCtrl", adminCtrl);
Components.controller("attualitaCtrl", attualitaCtrl);
Components.controller("orientamentoCtrl", orientamentoCtrl);
Components.controller("commentsCtrl", commentsCtrl);
Components.controller("conventionsCtrl", conventionsCtrl);
Components.controller("freeZoneCtrl", freeZoneCtrl);
Components.controller("libraryCtrl", libraryCtrl);
Components.controller("likesCtrl", likesCtrl);
Components.controller("linkCtrl", linkCtrl);
Components.controller("loginCtrl", loginCtrl);
Components.controller("moderationCtrl", moderationCtrl);
Components.controller("newsCtrl", newsCtrl);
Components.controller("settingsCtrl", settingsCtrl);
Components.controller("signupCtrl", signupCtrl);
Components.controller("tabsCtrl", tabsCtrl);
Components.controller("updateProfileCtrl", updateProfileCtrl);

export default Components;