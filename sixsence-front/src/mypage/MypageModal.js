import React from 'react';
import Modal from 'react-modal';
import "./MypageCss.css";

const MypageModal = ({ modalOpen, cancelList, handleButtonClick }) => {
  return (
    <Modal
      isOpen={modalOpen}
      contentLabel="Example Modal" 
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "340px",
        },
      }}
    >
      <h2>예매를 정말 취소하시겠습니까?</h2>
      <div className='modalBtn'>
        <button onClick={() => handleButtonClick(cancelList)}>확인</button>
        <button onClick={() => handleButtonClick("Cancel")}>취소</button>
      </div>
    </Modal>
  );
};

export default MypageModal;