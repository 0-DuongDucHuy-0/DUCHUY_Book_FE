import { useState, useEffect } from "react";
import * as ChatServices from "../services/ChatServices";
import { useSelector } from 'react-redux';


const ChatBox = () => {
    const user = useSelector((state) => state.user.user);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const fetchData = async () => {
        const res = await ChatServices.getAllChatsByUser(user?.user_id);
        if (res?.status === "OK") {
            setMessages(res?.data);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const sendMessage = await ChatServices.createChat({
            message: input,
            sender: "user",
            sent_at: Date.now(),
            user_id: user?.user_id
        })
        if (sendMessage?.status === "OK") {
            setMessages([...messages, { message: input, sender: "user", sent_at: Date.now(), user_id: user?.user_id }]);
        }
        setInput("");
    };

    console.log("ChatBox", user, messages);


    return (
        <div className="fixed bottom-5 right-5 max-w-md p-4 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
            <div className="h-64 overflow-y-auto p-2 bg-white rounded-md border border-gray-300">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <span
                            className={`px-3 py-1 rounded-lg inline-block border break-words ${msg.sender === "user" ? "bg-blue-500 text-white border-blue-700" : "bg-gray-300 text-black border-gray-500"}`}
                            style={{ maxWidth: "75%" }}
                        >
                            {msg?.message}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex mt-2 border-t border-gray-300 pt-2">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md border border-blue-700"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
