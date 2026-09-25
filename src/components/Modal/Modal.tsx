import { useEffect, useRef } from "react";
import "./Modal.css";

interface ModalProps {
  isVisible: boolean;
  title?: string;
  text: string;
  onClose: () => void;
  onActionPress?: () => void;
  onActionText?: string;
  textColor?: string;
  backgroundColor?: string;
  titleColor?: string;
}

export default function Modal({
  isVisible,
  title,
  text,
  onClose,
  onActionPress,
  onActionText,
  textColor,
  backgroundColor,
  titleColor,
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
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      style={{ backgroundColor: backgroundColor }}
    >
      {title && <h2 style={{ color: titleColor }}>{title}</h2>}
      <p style={{ color: textColor }}>{text}</p>
      <button
        type="button"
        className="modal-close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
      {onActionPress && onActionText && (
        <button type="button" className="modal-action" onClick={onActionPress}>
          {onActionText}
        </button>
      )}
    </dialog>
  );
}
