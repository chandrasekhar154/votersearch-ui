interface StreamCallbacks {
  onSession?: (sessionId: string) => void;
  onToken?: (token: string) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
}

const API_BASE_URL = "http://127.0.0.1:8090/api";

export async function streamChatResponse(
  prompt: string,
  sessionId: string | null,
  callbacks: StreamCallbacks,
) {
  const response = await fetch(`${API_BASE_URL}/query/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      session_id: sessionId,
    }),
  });

  if (!response.body) {
    throw new Error("Readable stream not supported.");
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, {
      stream: true,
    });

    const lines = buffer.split("\n\n");

    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data:")) {
        continue;
      }

      const jsonString = line.replace("data:", "").trim();

      try {
        const parsed = JSON.parse(jsonString);

        switch (parsed.type) {
          case "session":
            callbacks.onSession?.(parsed.session_id);
            break;

          case "token":
            callbacks.onToken?.(parsed.value);
            break;

          case "done":
            callbacks.onDone?.();
            break;

          case "error":
            callbacks.onError?.(parsed.message);
            break;
        }
      } catch (error) {
        console.error("SSE Parse Error:", error);
      }
    }
  }
}
