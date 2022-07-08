import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    page: 1,
    totalPage: null,
    loader: false,
    showModal: false,
    modalURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const newRequest = this.props.request;
    const API_KEY = '28033365-ba4821d388ed22fecf976971a';
    if (prevRequest !== newRequest) {
      this.setState({ page: 1, loader: true });
      fetch(
        `https://pixabay.com/api/?q=${newRequest}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          const { hits, totalHits, total } = data;

          if (total === 0) {
            toast.error('The search has not given any results');
            this.setState({});
            return;
          }

          this.setState({
            hits: hits,
            totalPage: Math.ceil(totalHits / 12),
          });
        })
        .finally(() => this.setState({ loader: false }));
    } else if (this.state.page > prevState.page) {
      this.setState({ loader: true });
      fetch(
        `https://pixabay.com/api/?q=${prevRequest}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({
            hits: [...prevState.hits, ...data.hits],
          });
        })
        .finally(() => this.setState({ loader: false }));
    }
  }

  getModalURL = URL => {
    this.setState({ modalURL: URL });
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { hits, page, totalPage, loader, showModal, modalURL } = this.state;
    return (
      <>
        <ul className={s.gallery}>
          <ImageGalleryItem
            hits={hits}
            onToggleModal={this.toggleModal}
            getModalURL={this.getModalURL}
          />
        </ul>
        {loader && <Loader />}
        {totalPage > 1 && totalPage !== page && (
          <Button loadMore={this.loadMore} />
        )}
        {showModal && <Modal url={modalURL} onToggleModal={this.toggleModal} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};
