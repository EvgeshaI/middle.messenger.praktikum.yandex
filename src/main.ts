import ChatPage from "./pages/chat-page/chat-page";

const block = new ChatPage();
const container = document.getElementById('app')!;
container.append(block.getContent()!);
