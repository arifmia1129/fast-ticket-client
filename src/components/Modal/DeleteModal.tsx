import React, { useState } from "react";
import { Button, Modal } from "antd";

interface IDeleteModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  showModal: () => void;
}

const DeleteModal = ({
  isModalOpen,
  showModal,
  handleOk,
  handleCancel,
}: IDeleteModalProps) => {
  return (
    <>
      <Modal
        title="Delete Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>If you delete, you can't access this after deleted</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
