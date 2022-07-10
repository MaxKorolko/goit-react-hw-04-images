import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ getModalURL, onToggleModal, hits }) {
  const openModal = event => {
    getModalURL(event.currentTarget.dataset.url);
    onToggleModal();
  };

  return hits.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li key={id} className={s.item}>
        <img
          className={s.img}
          src={webformatURL}
          alt=""
          data-url={largeImageURL}
          onClick={openModal}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onToggleModal: PropTypes.func.isRequired,
  getModalURL: PropTypes.func.isRequired,
};
