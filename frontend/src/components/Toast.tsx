type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div className="notification-toast">
      <span className="notification-icon">✓</span>
      <span className="notification-text">{message}</span>
    </div>
  );
}
