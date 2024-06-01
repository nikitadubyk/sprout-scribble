import { CheckCircle2 } from "lucide-react";

interface ErrorMessageProps {
  /**
   * Error message.
   */
  message?: string;
}

/**
 * Error message component to show message
 *
 */
export const ErrorMessage = ({ message }: ErrorMessageProps) =>
  message ? (
    <div className="bg-teal-400 text-secondary-foreground p-3 rounded-md">
      <CheckCircle2 />
      <p>{message}</p>
    </div>
  ) : null;
