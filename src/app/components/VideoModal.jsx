"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const VideoModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btnGlobal btnPreview"
      >
        Xem trước
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video xem trước</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            className="w-100"
            width={560}
            height={315}
            src="https://www.youtube.com/embed/pjm2aXT3A2M?si=jcNsPim2hqjQfDBu"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoModal;
