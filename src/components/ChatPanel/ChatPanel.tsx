import { FaPaperPlane, FaPlus } from "react-icons/fa";
import "./ChatPanel.css";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../types/chat";
import { streamChatResponse } from "../../types/chatService";
import { generateId } from "../../utils/generateId";

export default function ChatPanel() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
      id: generateId(),
      type: "user",
      content: prompt,
    };

    const assistantMessageId = generateId();

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSendPrompt();
    }
  }

  function handlePromptChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;

    setPrompt(textarea.value);

    textarea.style.height = "auto";

    textarea.style.height = `${textarea.scrollHeight}px`;
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
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Ask voters related..."
          className="chat-input"
          onKeyDown={handleKeyDown}
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
