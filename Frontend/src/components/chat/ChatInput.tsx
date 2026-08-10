import { useState, type FormEvent } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 items-end p-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Ask about flights, hotels, or plan a trip..."
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none rounded-[var(--radius-card)] border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark px-4 py-3 text-sm placeholder:text-text-light/40 dark:placeholder:text-text-dark/40 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="shrink-0 px-5 py-3 bg-accent text-white text-sm font-medium rounded-[var(--radius-card)] hover:bg-accent-hover active:scale-[0.97] transition-[background-color,transform] duration-150 ease-out disabled:opacity-50 disabled:active:scale-100 cursor-pointer"
      >
        Send
      </button>
    </form>
  );
}
