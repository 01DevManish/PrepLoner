import { type ToastProps } from "@/components/ui/toast";
import { useState, useEffect } from "react";

type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
}

type Toast = Omit<ToasterToast, "id">;

let memoryState: { toasts: ToasterToast[] } = { toasts: [] };
const listeners: Array<(state: { toasts: ToasterToast[] }) => void> = [];

function dispatch(action: { type: "ADD_TOAST"; toast: ToasterToast } | { type: "DISMISS_TOAST"; toastId?: string }) {
    if (action.type === "ADD_TOAST") {
        memoryState = { ...memoryState, toasts: [action.toast, ...memoryState.toasts] };
    } else if (action.type === "DISMISS_TOAST") {
        memoryState = {
            ...memoryState,
            toasts: memoryState.toasts.filter(t => t.id !== action.toastId),
        };
    }

    listeners.forEach((listener) => {
        listener(memoryState);
    });
}

export function toast(props: Toast) {
    const id = Math.random().toString(36).substring(2, 9);
    
    const newToast: ToasterToast = {
        ...props,
        id,
    };

    dispatch({ type: "ADD_TOAST", toast: newToast });
    
    return {
        id: id,
        dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
    };
}

export function useToast() {
    const [state, setState] = useState(memoryState);

    useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    };
}