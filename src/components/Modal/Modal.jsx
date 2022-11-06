import { Component } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow} from 'components/Modal/Modal.styled';

// export const Modal = ({ largeImageUrl, tags, onClick }) => {  
//   return (
//     <Overlay id='Overlay' onClick={onClick}>
//       <ModalWindow>
//         <img src={largeImageUrl} alt={tags} />
//       </ModalWindow>
//     </Overlay>)
// }

// Modal.propTypes = {
//   tags: PropTypes.string.isRequired,
//   largeImageUrl: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired
// }

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === "Escape") {      
      this.props.onClose()
    }
  }
  
  render() {
    const {
      largeImageUrl,
      tags,
      onClick
    } = this.props;

    return (
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={largeImageUrl} alt={tags} />
      </ModalWindow>
    </Overlay>)
  }
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}