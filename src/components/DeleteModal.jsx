// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal } from "antd";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      open={visible}
      title="Confirm Delete"
      onCancel={onClose}
      onOk={onConfirm}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete this enrollment?</p>
    </Modal>
  );
};

export default DeleteModal;
