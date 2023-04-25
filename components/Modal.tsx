import React, { MouseEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage, hideModal } from "@/store/modalSlice";

interface Props {
  confirmAction: Function;
}

const Modal = ({ confirmAction }: Props) => {
  const message = useSelector(selectMessage);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch(hideModal({ message: "" }));
  }

  const handleConfirm = () => {
    confirmAction();
    closeModal();
  };

  if (message) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black/50 z-50">
        <div className="flex flex-col justify-center items-center bg-white rounded-xl p-6 gap-4">
          <h2>{message}</h2>
          <div className="flex gap-8">
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
