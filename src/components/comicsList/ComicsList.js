import './comicsList.scss';
import { useMarvelService } from '../../services/marvelServices';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isNewItemLoading, setIsNewItemLoading] = useState(false);
  const [isComicsEnded, setIsComicsEnded] = useState(false);

  const { isLoading, isError, getAllComicses } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (currentOffset, initial = false) => {
    if (!initial) setIsNewItemLoading(true);

    getAllComicses(currentOffset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComics) => {
    const ended = newComics.length < 9;

    setComicsList((list) => [...list, ...newComics]);
    setIsNewItemLoading(false);
    setOffset((prev) => prev + 9);
    setIsComicsEnded(ended);
  };
  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner =  isLoading && !isNewItemLoading ? <Spinner /> : null;
  return (
    
    <div className="comics__list">
    {errorMessage}
      {spinner}
      <View comicsList={comicsList} />

      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={isNewItemLoading}
        style={{ display: isComicsEnded ? 'none' : 'block' }}
      >
        <span className="inner">load more</span>
      </button>
    </div>
  );
};

const View = ({ comicsList }) => {
  return (
    <ul className="comics__grid">
      {comicsList.map((el) => (
        <li className="comics__item" key={el.id} tabIndex={0}>
          <a href="#">
            <img
              src={el.thumbnail}
              alt={el.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{el.title}</div>
            <div className="comics__item-price">
              {typeof el.price === 'number' ? `${el.price}$` : el.price}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ComicsList;
