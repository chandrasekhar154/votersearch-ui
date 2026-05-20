import { FaPaperPlane, FaPlus } from "react-icons/fa";
import './ChatPanel.css'

export default function ChatPanel() {
    function handleSendPrompt() {
        console.log("send prompt");
    }

    return (
        <div className="chat-panel-container">
            <div className="chat-message-container">
                <div className="chat-welcome-message">
                    Welcome to AI Voter Search
                </div>
            </div>
            <div className="chat-input-section">
                <button className="upload-button">
                    <FaPlus />
                </button>
                <input type="text" placeholder="Ask something about voters data.." className="chat-input" />
                <button
                    className="send-button"
                    onClick={handleSendPrompt}
                >
                    <FaPaperPlane />
                </button>
            </div>

        </div>
    );
}