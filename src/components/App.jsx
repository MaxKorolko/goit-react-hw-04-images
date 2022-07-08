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
  };

  addRequest = newRequest => {
    if (this.state.request !== newRequest) {
      this.setState({ request: newRequest.toLowerCase() });
    }
  };

  render() {
    return (
      <div>
        <Searchbar onGetRequest={this.addRequest} />
        <Section>
          <ImageGallery request={this.state.request} />
        </Section>
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
