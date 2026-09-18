import { useEffect, useRef } from "react";
import "./Modal.css";

interface ModalProps {
  isVisible: boolean;
  text: string;
  onClose: () => void;
  onActionPress?: () => void;
  onActionText?: string;
}

export default function Modal({
  isVisible,
  text,
  onClose,
  onActionPress,
  onActionText,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isVisible && !dialog.open) {
      dialog.showModal();
    }

    if (!isVisible && dialog.open) {
      dialog.close();
    }
  }, [isVisible]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <p>{text}</p>
      <button type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      {onActionPress && onActionText && (
        <button type="button" onClick={onActionPress}>
          {onActionText}
        </button>
      )}
    </dialog>
  );
}
