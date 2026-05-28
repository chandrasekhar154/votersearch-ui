export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type MessageType = "user" | "assistant";

export interface ChatMessage {
  id: string;
  type: MessageType;
  content: string;
}
