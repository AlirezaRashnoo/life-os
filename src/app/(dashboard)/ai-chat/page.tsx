import AIChat from "@/components/ai-chat/Chat";

export default function AIChatPage() {
  return (
    <main
      dir="rtl"
      className="
        mx-auto
        flex
        h-full
        w-full
        max-w-5xl
        flex-col
        py-6
      "
    >
      <AIChat />
    </main>
  );
}
