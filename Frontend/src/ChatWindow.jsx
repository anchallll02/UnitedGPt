import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {

    const {
        prompt,
        setPrompt,
        currThreadId,
        setPrevChats,
        setNewChat
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {

        if (!prompt.trim() || loading) return;

        setLoading(true);
        setNewChat(false);

        const userMessage = prompt;

        // USER MESSAGE ADD
        setPrevChats(prev => [
            ...prev,
            {
                role: "user",
                content: userMessage
            }
        ]);

        // CLEAR INPUT
        setPrompt("");

        try {

            const response = await fetch(
                "http://localhost:8080/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        threadId: currThreadId
                    })
                }
            );

            const res = await response.json();

            console.log(res);

            // GPT MESSAGE ADD
            setPrevChats(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: res.reply || "No response"
                }
            ]);

        } catch (err) {

            console.log(err);

            setPrevChats(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong."
                }
            ]);
        }

        setLoading(false);
    };

    const handleProfileClick = () => {
        setIsOpen(prev => !prev);
    };

    return (

        <div className="chatWindow">

            {/* NAVBAR */}

            <div className="navbar">

                <span className="logo">
                    UnitedGPT
                    <i className="fa-solid fa-chevron-down"></i>
                </span>

                <div
                    className="userIconDiv"
                    onClick={handleProfileClick}
                >
                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>

            </div>

            {/* DROPDOWN */}

            {
                isOpen && (

                    <div className="dropDown">

                        <div className="dropDownItem">
                            <i className="fa-solid fa-gear"></i>
                            Settings
                        </div>

                        <div className="dropDownItem">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            Upgrade Plan
                        </div>

                        <div className="dropDownItem logout">
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            Logout
                        </div>

                    </div>
                )
            }

            {/* CHAT */}

            <div className="chatBody">
                <Chat />
            </div>

            {/* LOADER */}

            {
                loading && (
                    <div className="loader">
                        <ScaleLoader
                            color="#10a37f"
                            height={25}
                        />
                    </div>
                )
            }

            {/* INPUT */}

            <div className="chatInput">

                <div className="inputBox">

                    <input
                        type="text"
                        placeholder="Ask anything..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {
                                e.preventDefault();
                                getReply();
                            }
                        }}
                    />

                    <button
                        id="submit"
                        onClick={getReply}
                        disabled={loading}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>

                </div>

                <p className="info">
                    UnitedGPT can make mistakes. Check important info.
                </p>

            </div>

        </div>
    );
}

export default ChatWindow;