export async function sendPrompt(prompt: string) {
	const res = await fetch('http://3.107.102.207:8090/api/query', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt })
	});

	return res.json();
}