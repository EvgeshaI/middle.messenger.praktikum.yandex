import LoginPage from "./pages/auth-pages/login-page/login-page";
import RegisterPage from "./pages/auth-pages/register-page/register-page";
import UserSettingsPage from "./pages/user-settings-page/user-settings-page";
import ChatPage from "./pages/chat-page/chat-page";
import Router from "./tools/Router";
import {connect} from "./tools/Hoc";
import store, {IUser} from "./tools/Store";

let loginPage = connect(LoginPage)
let registerPage = connect(RegisterPage)
let userSettingsPage = connect(UserSettingsPage)
let chatPage = connect(ChatPage)

export const router = new Router("app");
router
    .use("/", loginPage)
    .use("/sign-up", registerPage)
    .use("/settings", userSettingsPage)
    .use("/messenger", chatPage)
    .start()


const storedUser = localStorage.getItem("user");
if (storedUser) {
    const user = JSON.parse(storedUser) as IUser;
    store.dispatch({
        type: 'SET_USER',
        user: user
    });
} else {
    router.go("/");
}


