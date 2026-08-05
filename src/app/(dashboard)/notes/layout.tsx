import { ReactNode } from "react";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      {/* Notes Header Area */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h2">Notes</h2>

            <p className="text-body-sm text-text-secondary">
              Your personal knowledge space
            </p>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
