import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './SearchBar.module.css';
import { ReactComponent as SearchIcon } from '../icons/searchIcon.svg';

export default function Searcbar({ onGetRequest }) {
  const [input, setInput] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (input.trim() === '') {
      return toast.error('search cannot be an empty string');
    }
    onGetRequest(input.trim().toLowerCase());
    setInput('');
  };

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={event => setInput(event.currentTarget.value)}
        ></input>
        <button className={s.btn} type="submit">
          <SearchIcon width="28" height="28" fill="black" />
        </button>
      </form>
    </header>
  );
}

Searcbar.propTypes = {
  onGetRequest: PropTypes.func.isRequired,
};
