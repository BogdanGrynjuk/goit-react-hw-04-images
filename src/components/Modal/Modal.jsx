import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow} from 'components/Modal/Modal.styled';

export const Modal = ({ onClick, onClose, largeImageUrl, tags }) => {    

  useEffect(() => {
    const  handleKeyDown = event => {
      if (event.code === "Escape") {      
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose])

  return (
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={largeImageUrl} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}