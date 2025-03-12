import { useState, useEffect, useRef } from "react";
import * as ChatServices from "../services/ChatServices";
import * as ColabMLServices from "../services/ColabMLServices";
import { useSelector } from 'react-redux';


const ChatBox = () => {
    const user = useSelector((state) => state.user.user);
    const chatRef = useRef(null);

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

    // const sendMessage = async () => {
    //     if (!input.trim()) return;
    //     const sendMessage = await ChatServices.createChat({
    //         message: input,
    //         sender: "user",
    //         sent_at: Date.now(),
    //         user_id: user?.user_id
    //     })
    //     if (sendMessage?.status === "OK") {
    //         const chatBotRes = await ColabMLServices.ask({
    //             question: input,
    //         });
    //         if (chatBotRes?.status === "OK") {
    //             setMessages(chatBotRes?.data);
    //         }
    //         if (chatBotRes?.answer) {
    //             setMessages([...messages, { message: input, sender: "user", sent_at: Date.now(), user_id: user?.user_id }]);
    //             const sendMessageChatBot = await ChatServices.createChat({
    //                 message: chatBotRes?.answer,
    //                 sender: "chatbot",
    //                 sent_at: Date.now(),
    //                 user_id: user?.user_id
    //             })
    //             if (sendMessageChatBot?.status === "OK") {
    //                 setMessages([...messages, { message: chatBotRes?.answer, sender: "chatbot", sent_at: Date.now(), user_id: user?.user_id }]);
    //             }
    //         }
    //     }
    //     setInput("");
    // };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            message: input,
            sender: "user",
            sent_at: Date.now(),
            user_id: user?.user_id
        };

        // Gửi tin nhắn của người dùng lên server
        const sendMessageRes = await ChatServices.createChat(userMessage);
        if (sendMessageRes?.status !== "OK") return;

        // Cập nhật UI ngay lập tức
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setInput(""); // Reset input sau khi hoàn tất

        try {
            // Gửi câu hỏi đến chatbot
            const chatBotRes = await ColabMLServices.ask({ question: input });
            if (chatBotRes?.status == "OK" || chatBotRes?.answer) {
                const botMessage = {
                    message: chatBotRes.answer,
                    sender: "chatbot",
                    sent_at: Date.now(),
                    user_id: user?.user_id
                };

                // Gửi tin nhắn của chatbot lên database
                const sendMessageChatBotRes = await ChatServices.createChat(botMessage);
                if (sendMessageChatBotRes?.status === "OK") {
                    // Chỉ cập nhật UI nếu tin nhắn của chatbot được lưu thành công
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                }
            }

        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Tự động cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);



    console.log("ChatBox", user, messages);


    return (
        <div className="fixed bottom-5 right-5 max-w-md p-4 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
            <div ref={chatRef} className="h-64 overflow-y-auto p-2 bg-white rounded-md border border-gray-300">
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
