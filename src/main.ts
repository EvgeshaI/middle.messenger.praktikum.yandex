import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";
import UserSettingsPage from "./pages/user-settings-page/user-settings-page";
import ChatPage from "./pages/chat-page/chat-page";
import Router from "./tools/Router";
import {connect} from "./tools/Hoc";


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

