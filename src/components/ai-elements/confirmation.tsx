"use client";

import { createContext, useContext, type ReactNode } from "react";

type ConfirmationState = "requires-approval" | "approved" | "rejected";

type ConfirmationContextValue = {
  approval?: () => void;
  rejection?: () => void;
  state: ConfirmationState;
};

const ConfirmationContext = createContext<
  ConfirmationContextValue | undefined
>(undefined);

export function ConfirmationProvider({
  children,
  approval,
  rejection,
  state,
}: {
  children: ReactNode;
  approval?: () => void;
  rejection?: () => void;
  state: ConfirmationState;
}) {
  return (
    <ConfirmationContext.Provider value={{ approval, rejection, state }}>
      {children}
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }
  return context;
}

// Example confirmation UI component
export function ConfirmationButton() {
  const { approval, rejection, state } = useConfirmation();

  if (state !== "requires-approval") {
    return null;
  }

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={approval}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Approve
      </button>
      <button
        onClick={rejection}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Reject
      </button>
    </div>
  );
}