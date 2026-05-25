import axios from "axios";
import "dotenv/config";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const getGroqAPIResponse = async (message) => {
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                },
            }
        );

        const reply = response.data?.choices?.[0]?.message?.content;

        if (!reply) {
            console.log("Unexpected Groq response:", response.data);
            return "No response generated from AI.";
        }

        return reply;

    } catch (err) {
        console.log("Groq API Error:", err.response?.data || err.message);
        return "Something went wrong while connecting to AI.";
    }
};

export default getGroqAPIResponse;