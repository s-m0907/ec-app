import { useState } from "react";

interface UseModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
};

export default useModal;
