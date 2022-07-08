import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Section from './Section/Section';

// import Button from './Button/Button';

export default class App extends Component {
  state = {
    request: '',
    page: 1,
  };

  addRequest = newRequest => {
    if (this.state.request !== newRequest) {
      this.setState({ request: newRequest.toLowerCase(), page: 1 });
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { request, page } = this.state;
    return (
      <div>
        <Searchbar onGetRequest={this.addRequest} />
        <Section>
          <ImageGallery
            request={request}
            page={page}
            loadMore={this.loadMore}
          />
        </Section>
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
