import { FaPaperPlane, FaPlus } from "react-icons/fa";
import "./ChatPanel.css";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../types/chat";
import { streamChatResponse } from "../../types/chatService";

export default function ChatPanel() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSendPrompt() {
    if (!prompt.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "user",
      content: prompt,
    };

    const assistantMessageId = crypto.randomUUID();

    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      type: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    const currentPrompt = prompt;

    setPrompt("");

    setLoading(true);

    try {
      await streamChatResponse(currentPrompt, sessionId, {
        onSession: (newSessionId) => {
          setSessionId(newSessionId);
        },

        onToken: (token) => {
          setMessages((prev) =>
            prev.map((message) => {
              if (message.id === assistantMessageId) {
                return {
                  ...message,
                  content: message.content + token,
                };
              }

              return message;
            }),
          );
        },

        onDone: () => {
          setLoading(false);
        },

        onError: (errorMessage: any) => {
          console.error(errorMessage);

          setLoading(false);
        },
      });
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSendPrompt();
    }
  }

  return (
    <div className="chat-panel-container">
      <div className="chat-messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.type === "user"
                ? "message-row user-row"
                : "message-row assistant-row"
            }
          >
            <div
              className={
                message.type === "user" ? "user-message" : "assistant-message"
              }
            >
              {message.content}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-section">
        <button className="upload-button">
          <FaPlus />
        </button>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask voter related questions..."
          className="chat-input"
        />

        <button
          className="send-button"
          onClick={handleSendPrompt}
          disabled={loading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
