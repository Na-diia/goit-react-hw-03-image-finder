import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

 componentDidMount() {
   document.addEventListener("keydown", this.closeModal);
  };

 componentWillUnmount(){
  document.removeEventListener("keydown", this.closeModal);
 };

 closeModal = ({target, currentTarget, code}) => {
  if(target === currentTarget || code === "Escape") {
      this.props.close();
  };
 };

  render() {
    const {image} = this.props;
    const{closeModal} = this;

   return (
    createPortal( 
    <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal} >
         <img src={image} alt='' />
        </div>
    </div>, modalRoot)
    );
  }
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};