import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import styles from './image-gallery.module.css';

export const ImageGallery = ({images, showImage}) => {
  const elements = images.map(({id, webformatURL, largeImageURL, tags}) => 
  <ImageGalleryItem onClick={() => showImage(largeImageURL)} key={id} 
    bigImg={largeImageURL} webImg={webformatURL} tags={tags}/>);

  return (
    <ul className={styles.gallery}>
       {elements}
    </ul>
  );
};

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
})).isRequired,
  showImage: PropTypes.func.isRequired,
};