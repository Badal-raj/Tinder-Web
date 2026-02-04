import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalComponent = ({
  show,
  onClose,
  title,
  children,
  buttonName,
}) => {
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        dialogClassName="shadow"
        centered
      >
        <Modal.Header>
          <Modal.Title className="d-flex align-items-center gap-2">
            <span>Tinder🔥</span>
            <span>{title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="footer-style">
          <Button variant="primary" onClick={onClose}>
            {buttonName ? buttonName : "Cancel"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
