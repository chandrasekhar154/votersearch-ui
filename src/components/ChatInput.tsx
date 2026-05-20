import { useState } from "react";
import '../styles/app.css'

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {

	const [input, setInput] = useState('');

	const handleSend = () => {
		if (!input.trim()) return;
		onSend(input);
		setInput('');
	};
	return (
		<div className="chat-input">
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Ask something..."
			/>
			<button onClick={handleSend}>Go</button>
		</div>
	)
}