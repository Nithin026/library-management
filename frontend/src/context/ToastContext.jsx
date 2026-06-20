import { createContext, useState, useCallback } from "react";
import "../styles/toast.css";

// Create context
export const ToastContext = createContext();

// Provider
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    // Remove toast by id
    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    // Add new toast
    const addToast = useCallback((message, type = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            
            {/* Render Toasts Container */}
            {toasts.length > 0 && (
                <div className="toast-container">
                    {toasts.map((toast) => (
                        <div key={toast.id} className={`toast-card ${toast.type}`}>
                            <span className="toast-message">{toast.message}</span>
                            <button 
                                className="toast-close-btn" 
                                onClick={() => removeToast(toast.id)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </ToastContext.Provider>
    );
}
