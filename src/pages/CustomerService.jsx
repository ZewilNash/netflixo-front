import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/auth";

function CustomerService() {
  const [auth] = useAuth();
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: "1",
        name: `${auth?.user?.fullname}`,
        email: `${auth?.user?.email}`,
        photoUrl: `${process.env.API}/api/v1/auth/user-image/${auth?.user?._id}`,
        welcomeMessage: "Hello!",
        role: "default"
      });

      const otherUser = new Talk.User({
        id: "2",
        name: "Abdelrahman Mohammed",
        email: "mo.lover34034034@gmail.com",
        photoUrl:
          "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png",
        welcomeMessage: "Hello! How Can I Help You?",
        role: "default"
      });

      const session = new Talk.Session({
        appId: "t1VAHV3P",
        me: currentUser
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} />;
}

export default CustomerService;
