import PropTypes from 'prop-types';
import { ImageGalleryListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, imageUrl, tags, onClick }) => {
  return (
    <ImageGalleryListItem onClick={() => onClick(id)}>
      <Image src={imageUrl} alt={tags} />
    </ImageGalleryListItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

