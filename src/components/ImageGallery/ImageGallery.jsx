
import PropTypes from 'prop-types';
import { ImageGalleryList } from 'components/ImageGallery/ImageGallery.styled'
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ images, onClick }) => {
    return (<div>
        <ImageGalleryList>
            {images.map(({ id, webformatURL, tags }) => {
                return (
                    <ImageGalleryItem
                        key={id}
                        id={id}
                        imageUrl={webformatURL}
                        tags={tags}
                        onClick={onClick}
                    />
                );
            })}
        </ImageGalleryList>
    </div>
        
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired
        })
    ),
    onClick: PropTypes.func.isRequired
}