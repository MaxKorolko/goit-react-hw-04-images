import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default function ImageGallery({ request, page, loadMore }) {
  const [hits, setHits] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalURL, setModalURL] = useState('');

  const API_KEY = '28033365-ba4821d388ed22fecf976971a';

  useEffect(() => {
    if (!request) {
      return;
    }
    setLoader(true);
    fetch(
      `https://pixabay.com/api/?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        const { hits, totalHits, total } = data;

        if (total === 0) {
          toast.error('The search has not given any results');
          return;
        }
        if (page === 1) {
          setHits(hits);
          setTotalPage(Math.ceil(totalHits / 12));
        } else {
          setHits(prev => [...prev, ...hits]);
        }
      })
      .finally(() => setLoader(false));
  }, [page, request]);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <ul className={s.gallery}>
        <ImageGalleryItem
          hits={hits}
          onToggleModal={toggleModal}
          getModalURL={setModalURL}
        />
      </ul>
      {loader && <Loader />}
      {totalPage > 1 && totalPage !== page && <Button loadMore={loadMore} />}
      {showModal && <Modal url={modalURL} onToggleModal={toggleModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
