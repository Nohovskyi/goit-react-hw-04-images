import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchImg, setSearchImg] = useState('');

  const handleSearchImgChange = e =>
    setSearchImg(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (searchImg.trim() === '') {
      return;
    }

    onSubmit(searchImg);
    setSearchImg('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImg}
          onChange={handleSearchImgChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
