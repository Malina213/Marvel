import './charList.scss';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { MarvelService } from '../../services/marvelServices';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewItemLoading, setIsNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isCharEnded, setIsCharEnded] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);

  const itemRefs = useRef([]);
  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (currentOffset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(currentOffset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setIsNewItemLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    const ended = newCharList.length < 9;

    setCharList((list) => [...list, ...newCharList]);
    setIsLoading(false);
    setIsNewItemLoading(false);
    setOffset((prev) => prev + 9);
    setIsCharEnded(ended);
  };

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const focusOnItem = (index) => {
    if (!itemRefs.current.length || !itemRefs.current[index]) return;

    itemRefs.current.forEach((ref) => {
      if (ref) ref.classList.remove('char__item_selected');
    });

    itemRefs.current[index].classList.add('char__item_selected');
    itemRefs.current[index].focus();
  };

  const handleCharSelected = (id, index) => {
    setSelectedChar(id);
    focusOnItem(index);

    if (onCharSelected) {
      onCharSelected(id);
    }
  };

  const handleCharFocused = (id) => {
    setSelectedChar(id);
  };

  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content =
    !isLoading && !isError ? (
      <View
        charList={charList}
        onCharSelected={handleCharSelected}
        itemRefs={itemRefs}
        selectedChar={selectedChar}
        onCharFocused={handleCharFocused}
      />
    ) : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={isNewItemLoading}
        style={{ display: isCharEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const View = ({ charList, onCharSelected, itemRefs, selectedChar, onCharFocused }) => {
  return (
    <ul className="char__grid">
      {charList.map((el, index) => (
        <li
          key={el.id}
          tabIndex={0}
          ref={(node) => (itemRefs.current[index] = node)}
          className={
            el.id === selectedChar ? 'char__item char__item_selected' : 'char__item'
          }
          onClick={() => onCharSelected(el.id, index)}
          onFocus={() => onCharFocused(el.id)}
        >
          <img src={el.thumbnail} alt={el.name} />
          <div className="char__name">{el.name}</div>
        </li>
      ))}
    </ul>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
