import './randomChar.scss';
import { useEffect, useState } from 'react';
import { useMarvelService } from "../../services/marvelServices";
import { Spinner } from '../spinner/Spinner';
import { ErrorMessage } from '../errorMessage/ErrorMessage';



const RandomChar = () => {
  const [char, setChar] = useState({});

  const {isLoading, isError, getCharacter, clearError} = useMarvelService();

  const onCharLoaded = (charData) => {
    setChar(charData);
  };

  const randomChar = () => {
    clearError()
    const id = Math.floor(Math.random() * (20 - 1));
    getCharacter(id).then(onCharLoaded)
  };

  useEffect(() => {
    randomChar();
  }, []);

  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !isLoading && !isError ? <View char={char} /> : null;

  return (
    <section className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button onClick={randomChar} className="button button__main">
          <span className="inner">try it</span>
        </button>
      </div>
    </section>
  );
};

const View = ({ char }) => {
  const { name, desc, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        width={180}
        height={180}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {desc ? desc : 'Описания нет'}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <span className="inner">homepage</span>
          </a>
          <a href={wiki} className="button button__secondary">
            <span className="inner">Wiki</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
