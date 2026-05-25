import "./Sidebar.css";

import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

// LOGO IMPORT
import blacklogo from "./assets/blacklogo.png";

function Sidebar() {

    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setCurrThreadId,
        setPrevChats
    } = useContext(MyContext);

    // GET THREADS

    const getAllThreads = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/thread"
            );

            const res = await response.json();

            const filteredData = res
                .map(thread => ({
                    threadId: thread.threadId,
                    title: thread.title
                }))
                .reverse();

            setAllThreads(filteredData);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, []);

    // NEW CHAT

    const createNewChat = () => {

        setNewChat(true);

        setPrompt("");

        setCurrThreadId(uuidv1());

        setPrevChats([]);
    };

    // CHANGE THREAD

    const changeThread = async (newThreadId) => {

        setCurrThreadId(newThreadId);

        try {

            const response = await fetch(
                `http://localhost:8080/api/thread/${newThreadId}`
            );

            const res = await response.json();

            setPrevChats(res);

            setNewChat(false);

        } catch (err) {

            console.log(err);
        }
    };

    // DELETE THREAD

    const deleteThread = async (threadId) => {

        try {

            await fetch(
                `http://localhost:8080/api/thread/${threadId}`,
                {
                    method: "DELETE"
                }
            );

            setAllThreads(prev =>
                prev.filter(
                    thread => thread.threadId !== threadId
                )
            );

            if (threadId === currThreadId) {
                createNewChat();
            }

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <section className="sidebar">

            {/* TOP */}

            <div className="topSection">

                <button
                    className="newChatBtn"
                    onClick={createNewChat}
                >

                    <div className="logoSection">

                        {/* LOGO IMAGE */}

                        <img
                            src={blacklogo}
                            alt="Logo"
                            className="logoImage"
                        />

                        <span className="brandName">
                            UnitedGPT
                        </span>

                    </div>

                    <i className="fa-solid fa-pen-to-square"></i>

                </button>

            </div>

            {/* HISTORY */}

            <div className="historyContainer">

                <p className="historyTitle">
                    Recent Chats
                </p>

                <ul className="history">

                    {
                        allThreads?.length > 0 ? (

                            allThreads.map((thread, idx) => (

                                <li
                                    key={idx}
                                    onClick={() =>
                                        changeThread(
                                            thread.threadId
                                        )
                                    }
                                    className={
                                        thread.threadId === currThreadId
                                            ? "highlighted"
                                            : ""
                                    }
                                >

                                    <span className="threadText">
                                        {
                                            thread.title ||
                                            "New Chat"
                                        }
                                    </span>

                                    <i
                                        className="fa-solid fa-trash deleteBtn"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            deleteThread(
                                                thread.threadId
                                            );
                                        }}
                                    ></i>

                                </li>
                            ))

                        ) : (

                            <p className="emptyHistory">
                                No chats yet
                            </p>
                        )
                    }

                </ul>

            </div>

            {/* FOOTER */}

            <div className="sign">

                <p>
                    Made with ❤️ by Anchal
                </p>

            </div>

        </section>
    );
}

export default Sidebar;