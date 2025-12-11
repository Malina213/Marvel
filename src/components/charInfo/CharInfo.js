import './charInfo.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {  useMarvelService } from '../../services/marvelServices';
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


const CharInfo = ({ charId  }) => {
  const [char, setChar] = useState(null);

  const {isLoading, isError, getCharacter, clearError} = useMarvelService();

  const onCharLoaded = (charData) => setChar(charData);
  
  const updateCharInfo = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded)
      
  };
  useEffect(() => {
    updateCharInfo();
  }, [charId]);

  const skeleton = char || isLoading || isError ? null : <Skeleton />;
  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !isLoading && !isError && char ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: 'cover' };
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.slice(0, 10).map((item, i) => (
          <li key={i} className="char__comics-item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charID: PropTypes.number,
};

export default CharInfo;
