import { Modal } from "antd";

interface IConfirmationModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  description: string;
}

const ConfirmationModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  description,
}: IConfirmationModalProps) => {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
