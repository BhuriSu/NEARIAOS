

const getConversations = async () => {
    try {
        const res = await fetch(`/api/messages`);
        return await res.json()
    } catch (err) {
      console.log(err);
    }
  };
  
  const getMessages = async (conversationId) => {
    try {
        const res = await fetch(`/api/messages/${conversationId}`);
        return await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const sendMessage = async (message, recipientId) => {
    try {
      const res = await fetch(`/api/messages/${recipientId}`, {
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
  export { getConversations, getMessages, sendMessage };