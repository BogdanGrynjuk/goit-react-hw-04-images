import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {  
  Label,
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase()
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      Notify.info('Please, write name for the image');
      return;
    }
    
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <SearchBarHeader>

        <SearchForm onSubmit={this.handleSubmit}>

          <SearchFormButton type="submit">
            <Label>Search</Label>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            value={this.state.searchQuery}
            onChange={this.handleChange}
            autoFocus
            placeholder="Search images and photos"
          />

        </SearchForm>

      </SearchBarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};