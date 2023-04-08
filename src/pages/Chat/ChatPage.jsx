import { ChatEngine } from "react-chat-engine";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import ChatFeed from "./ChatFeed";
import LoginForm from "./LoginForm";

const projectID = "5bec44e9-6bb2-4e51-b63b-7da4a4e5a2f5";

let content;

if (!localStorage.getItem("username")) {
  content = (
    <>
      <Layout title="Netflix - Community Chat">
        <div className="">
          <LoginForm />
        </div>
        <Footer />
      </Layout>
    </>
  );
} else {
  content = (
    <>
      <Layout title="Netflix - Community Chat">
        <ChatEngine
          height="100vh"
          projectID={projectID}
          userName={localStorage.getItem("username")}
          userSecret={localStorage.getItem("password")}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          onNewMessage={() =>
            new Audio(
              "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
            ).play()
          }
        />
        <Footer />
      </Layout>
    </>
  );
}

const ChatPage = () => {
  return content;
};

export default ChatPage;
