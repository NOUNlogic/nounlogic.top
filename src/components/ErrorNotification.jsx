import { useEffect } from 'react';
import { useError } from '../contexts/ErrorContext';

export default function ErrorNotification() {
  const { errors, removeError } = useError();

  // Auto-dismiss errors after 5 seconds
  useEffect(() => {
    const timers = errors.map(error => {
      return setTimeout(() => {
        removeError(error.id);
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [errors, removeError]);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="error-notification-container">
      {errors.map(error => (
        <div key={error.id} className="error-notification">
          <div className="error-notification-message">{error.message}</div>
          <button 
            className="error-notification-close" 
            onClick={() => removeError(error.id)}
          >
            ×
          </button>
        </div>
      ))}
      <style jsx>{`
        .error-notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .error-notification {
          background-color: #f8d7da;
          color: #721c24;
          padding: 12px 20px;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.3s ease-out forwards;
        }
        .error-notification-message {
          flex-grow: 1;
          margin-right: 10px;
        }
        .error-notification-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #721c24;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
