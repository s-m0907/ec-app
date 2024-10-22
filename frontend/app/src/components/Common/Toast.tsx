import { useEffect } from "react";
import styled from "styled-components";

interface ToastDivProps {
  color?: string;
}

const ToastDiv = styled.div<ToastDivProps>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: whitesmoke;
  color: ${(props) => props.color || "white"};
  border: 2px solid ${(props) => props.color || "transparent"};
  padding: 10px;
  border-radius: 5px;
  opacity: 0.9;
  transition: opacity 0.3s ease;
`;

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
  color?: string;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
  color,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, message]);

  return <ToastDiv color={color}>{message}</ToastDiv>;
};

export default Toast;
