import { useState } from "react";
import type { Message } from "../types/chat";
import { sendPrompt } from "../services/api";

import '../styles/app.css'
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function ChatPanel() {

	const [messages, setMessages] = useState<Message[]>([]);

	const handleSend = async (prompt: string) => {
		const userMsg: Message = {
			id: Date.now().toString(),
			role: 'user',
			content: prompt,
		};

		setMessages((prev) => [...prev, userMsg]);

		// Temporary "Generating..." message
		const loadingMsg: Message = {
			id: 'loading',
			role: 'assistant',
			content: 'Generating...',
		};

		setMessages((prev) => [...prev, userMsg, loadingMsg]);

		const response = await sendPrompt(prompt);
		console.log(response);

		// TODO: Replace with API call
		setTimeout(() => {
			const responseMsg: Message = {
				id: Date.now().toString(),
				role: 'assistant',
				content: 'Sample response from backend',
			};

			setMessages((prev) =>
				prev.filter((m) => m.id !== 'loading').concat(responseMsg)
			);
		}, 1500);
	};

	return (
		<div className="chat-window">
			<div className="messages">
				{messages.map((msg) => (
					<MessageBubble key={msg.id} message={msg} />
				))}
			</div>

			<ChatInput onSend={handleSend} />
		</div>
	);
}