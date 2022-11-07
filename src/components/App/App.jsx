import { useState, useEffect } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import api from "servises/service-pixabay";
import { Container } from "./App.styled";
import { SearchBar } from "components/Searchbar/Searchbar";
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from "components/Modal/Modal";

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchImages(searchQuery, page) {
      try {        
        setIsLoadingImage(true);

        const images = await api.fetchImages(
          searchQuery,
          page
        );

        if (page === 1) {
          setImages(images);
        } else {
          setImages(prevState => [...prevState, ...images])
        }

      } catch (error) {
        Notify.failure('Sorry, wrong request!!!');

      } finally {
        setIsLoadingImage(false);
      }
    };

    if (searchQuery) {
      fetchImages(searchQuery, page);
    }
  }, [searchQuery, page]);

  const toggleShowModal = () => {
    setShowModal(prevState => !prevState);
  };
  
  const onFormSubmit = searchNameImages => {
    if (searchNameImages !== searchQuery) {
      setSearchQuery(searchNameImages.toString());
      setPage(1);
      setImages([]);
    }
    
  };

  const onButtonClick = () => {   
    setPage(prevState => prevState + 1);
  };

  const onItemClick = (id) => {
    const modalImage = images.find(image => image.id === id);
    setModalImageURL(modalImage.largeImageURL);
    setTags(modalImage.tags)
   
    toggleShowModal();
  }

  const onOverlayClick = (event) => {    
    if (event.target === event.currentTarget) {      
      toggleShowModal();
    }
  }

  return (
    <Container>
      <SearchBar onSubmit={onFormSubmit} />
      {isLoadingImage && <Loader />}
      {showModal && <Modal onClick={onOverlayClick} onClose={toggleShowModal} largeImageUrl={modalImageURL} tags={tags} />}
      {images.length > 0 && <ImageGallery images={images} onClick={onItemClick} />}
      {images.length >= 12  && (
        <>
          <Button changePage={onButtonClick} />
        </>
      )}
    </Container>
  );
};