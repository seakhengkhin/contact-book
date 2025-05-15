import { useEffect } from "react";

interface AlertProps {
  type: "error" | "success";
  message: string;
  onClose?: () => void;
  duration?: number;
}

export function Alert({ type, message, onClose, duration = 5000 }: AlertProps) {
  const alertStyles =
    type === "error"
      ? "bg-red-100 text-red-800 border-red-400"
      : "bg-green-100 text-green-800 border-green-400";

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 border-l-4 p-4 rounded-md shadow-lg ${alertStyles} flex justify-between items-center z-50 min-w-[300px]`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg font-bold text-gray-600 hover:text-gray-800 ml-4"
        >
          &times;
        </button>
      )}
    </div>
  );
}