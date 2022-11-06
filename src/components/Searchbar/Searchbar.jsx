import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {  
  Label,
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const SearchBar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {    
    setSearchQuery(event.currentTarget.value.toLowerCase())
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      Notify.info('Please, write name for the image');
      return;
    }
    
    onSubmit(searchQuery);
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <Label>Search</Label>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          value={searchQuery}
          onChange={handleChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBarHeader>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};