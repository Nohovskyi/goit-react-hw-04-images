import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { fetchImage } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [question, setQuestion] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (question === '') {
      return;
    }

    setLoading(true);

    fetchImage(question, currentPage)
      .then(data => {
        console.log(data);
        if (data.hits.length === 0) {
          setError(true);
          setLoading(false);
        }
        return (
          setImages(prevImages => [...prevImages, ...data.hits]),
          setTotalHits(data.total),
          setLoading(false)
        );
      })
      .catch(error => console.log(error));
  }, [question, currentPage]);

  const handleFormSubmit = searchImages => {
    console.log(searchImages);
    setQuestion(searchImages);
    setCurrentPage(1);
    setImages([]);
    setImage('');
    setError(false);
  };

  const handleLoadMoreBtn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const showToggleModal = (image, tags) => {
    setVisibility(prevState => !prevState);
    setImage(image);
    setTags(tags);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {question === '' && <h2 className={css.text}>Введите имя фото</h2>}

      <ImageGallery images={images} clickOnImage={showToggleModal} />

      {error && <h3 className={css.text}>Нет картинок с именем {question}</h3>}

      {images.length >= 12 && (
        <Button
          disabled={totalHits === images.length}
          onClick={handleLoadMoreBtn}
          textChenge={
            totalHits === images.length ? 'No more picture' : 'Load More'
          }
        />
      )}

      {loading === true && <Loader />}

      {visibility && (
        <Modal
          closeModal={showToggleModal}
          image={image}
          tags={tags}
          state={visibility}
        />
      )}
    </div>
  );
};
