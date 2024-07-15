import LoginPage from "./pages/login-page/login-page";

const block = new LoginPage();
const container = document.getElementById('app')!;
container.append(block.getContent()!);
