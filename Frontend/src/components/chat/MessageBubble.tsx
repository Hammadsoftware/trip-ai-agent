import type { ChatMessage } from "../../types";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-white rounded-[var(--radius-card)] rounded-br-md"
            : message.isError
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-[var(--radius-card)] rounded-bl-md"
              : "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark rounded-[var(--radius-card)] rounded-bl-md"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
