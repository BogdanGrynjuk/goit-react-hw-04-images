import { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import api from "servises/service-pixabay";

import { Container } from "./App.styled";
import { SearchBar } from "components/Searchbar/Searchbar";
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from "components/Modal/Modal";


export class App extends Component {
  state = {
    images: [],
    error: null,
    isLoadingImage: false,
    searchQuery: '',
    page: 1,
    modalImageURL: null,
    tags: null,
    showModal: false
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      try {
        this.setState({ isLoadingImage: true });

        const images = await api.fetchImages(
          searchQuery,
          page
        );

        if (searchQuery !== prevState.searchQuery) {
          this.setState({ images: images });         
          
        } else {
          this.setState(prevState => {
            return { images: [...prevState.images, ...images] };
          });
        }

      } catch (error) {
        Notify.failure('Sorry, wrong request!!!');        
        
      } finally {
        this.setState({ isLoadingImage: false });
      }
    }
    return null;
  }

  toggleShowModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  onFormSubmit = searchNameImages => {
    if (searchNameImages !== this.state.searchQuery) {
      this.setState({
        searchQuery: searchNameImages.toString(),
        page: 1,
        images: []
      });
    }
  };

  onButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 }
    })
  }

  onItemClick = (id) => {
    const modalImage = this.state.images.find(image => image.id === id);
    this.setState({
      modalImageURL: modalImage.largeImageURL,
      tags: modalImage.tags      
    });
    this.toggleShowModal();
  }

  onOverlayClick = (event) => {    
    if (event.target === event.currentTarget) {      
      this.toggleShowModal();
    }
  }

  render() {
    const {
      isLoadingImage,
      images,
      showModal,
      modalImageURL,
      tags,
    } = this.state;    
    
    return (
      <Container>
        <SearchBar onSubmit={this.onFormSubmit} />
        {isLoadingImage && <Loader />}
        {showModal && <Modal onClick={this.onOverlayClick} onClose={this.toggleShowModal} largeImageUrl={modalImageURL} tags={tags} />}
        {images.length > 0 && <ImageGallery images={images} onClick={this.onItemClick} />}
        {images.length >= 12  && (
          <>
            <Button
              changePage={this.onButtonClick}              
            />
          </>
        )}
      </Container>
    );
  }
}

