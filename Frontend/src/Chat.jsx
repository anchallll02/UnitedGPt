import "./Chat.css";
import React, {
    useContext,
    useEffect,
    useRef
} from "react";

import { MyContext } from "./MyContext";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

function Chat() {

    const {
        newChat,
        prevChats
    } = useContext(MyContext);

    const bottomRef = useRef(null);

    // AUTO SCROLL

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [prevChats]);

    return (

        <div className="chats">

            {
                newChat && (
                    <div className="emptyChat">
                        <h1>Start a New Chat 🚀</h1>
                    </div>
                )
            }

            {
                prevChats?.map((chat, idx) => (

                    <div
                        key={idx}
                        className={
                            chat.role === "user"
                                ? "userDiv"
                                : "gptDiv"
                        }
                    >

                        {
                            chat.role === "user" ? (

                                <p className="userMessage">
                                    {chat.content}
                                </p>

                            ) : (

                                <ReactMarkdown
                                    rehypePlugins={[
                                        rehypeHighlight
                                    ]}
                                >
                                    {chat.content}
                                </ReactMarkdown>

                            )
                        }

                    </div>
                ))
            }

            <div ref={bottomRef}></div>

        </div>
    );
}

export default Chat;