import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ url, onToggleModal }) {
  useEffect(() => {
    const backDrop = document.querySelector('#backDrop');
    window.addEventListener('keydown', closeModal);
    backDrop.addEventListener('click', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = event => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className={s.overlay} id="backDrop">
      <div className={s.modal}>
        <img src={url} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
