import type { Message } from "../types/chat"

export default function MessageBubble({ message }: { message: Message }) {
    return (
        <div className={`message ${message.role}`}>
            <div className="bubble">{message.content}</div>
        </div>
    )
}