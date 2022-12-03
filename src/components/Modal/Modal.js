import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import styles from "./Modal.module.scss";
//import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }) => {
  //const text=props;
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Enter text</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            Close
          </button>
          <div className={styles.modalContent}>
            <p></p>
            <input type="text" ></input>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Find
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;