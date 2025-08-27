import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      console.log(chat.data.messages);

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          time: createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text, time: new Date() }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto m-5 h-[85vh] flex flex-col">
      {/* Enhanced Chat Container */}
      <div className="backdrop-blur-sm bg-base-300/50 rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col h-full overflow-hidden">
        
        {/* Enhanced Header */}
        <div className="p-5 border-b border-gray-700/50 bg-base-300/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="avatar online placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span className="text-xl">
                  {targetUser?.firstName?.[0] || "U"}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                {targetUser?.firstName || "Chat"}
              </h1>
              <p className="text-xs text-gray-400">
                {isTyping ? "Typing..." : "Active now"}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-transparent to-base-300/30">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isOwnMessage = user.firstName === msg.firstName;
              return (
                <div
                  key={index}
                  className={`chat ${isOwnMessage ? "chat-end" : "chat-start"} animate-fadeIn`}
                >
                  <div className="chat-image avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span>{msg.firstName?.[0] || "?"}</span>
                    </div>
                  </div>
                  <div className="chat-header text-xs opacity-70 mb-1">
                    {`${msg.firstName} ${msg.lastName || ""}`}
                    <time className="text-xs opacity-50 ml-2">
                      {formatTime(msg.time)}
                    </time>
                  </div>
                  <div className={`chat-bubble ${
                    isOwnMessage 
                      ? "bg-primary text-primary-content" 
                      : "bg-base-100 text-base-content"
                  } shadow-lg`}>
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Enhanced Input Area */}
        <div className="p-5 border-t border-gray-700/50 bg-base-300/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Emoji Button */}
            <button className="btn btn-circle btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            
            {/* Input Field */}
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 input input-bordered input-primary bg-base-100/50 backdrop-blur-sm"
            />
            
            {/* Attachment Button */}
            <button className="btn btn-circle btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            {/* Send Button */}
            <button 
              onClick={sendMessage} 
              disabled={!newMessage.trim()}
              className="btn btn-primary btn-circle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;