import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Section from './Section/Section';

export default function App() {
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);

  const addRequest = newRequest => {
    if (request !== newRequest) {
      setRequest(newRequest.toLowerCase());
      setPage(1);
    }
  };

  const loadMore = () => setPage(prevState => prevState + 1);

  return (
    <div>
      <Searchbar onGetRequest={addRequest} />
      <Section>
        <ImageGallery request={request} page={page} loadMore={loadMore} />
      </Section>
      <ToastContainer autoClose={2500} />
    </div>
  );
}
