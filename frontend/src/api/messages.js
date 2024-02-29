
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const getConversation = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const res = await fetch(`/messages/`);
        return await res.json();
      } else {
        console.log("User not logged in");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const getMessages = async (conversationId) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const res = await fetch(`/messages/${conversationId}`);
        return await res.json();
      } else {
        console.log("User not logged in");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const sendMessage = async (message, recipientId) => {
    try {
      const res = await fetch(`/messages/${recipientId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  export { getConversation, getMessages, sendMessage };