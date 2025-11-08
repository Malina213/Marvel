import './randomChar.scss';
import { Component } from 'react';
import { MarvelService } from "../../services/marvelServices";
class RandomChar extends Component{
    constructor(props){
      super(props)
      this.randomChar()
    }
    state = {
      char: {}
    }
    marvelService = new MarvelService();
    onCharLoaded = (char) => {
      this.setState({char})
    }
    randomChar = () => {
      let id = Math.floor(Math.random() * (20 - 1))
      this.marvelService.getCharacter(id).then(this.onCharLoaded)
    }

    render(){
      const {char : {name, desc, thumbnail, homepage, wiki}} = this.state
      return (
      <section className="randomchar">
        <div className="randomchar__block">
          <img src={thumbnail} alt="Random character" className="randomchar__img" width={180} height={180}/>
          <div className="randomchar__info">
              <p className="randomchar__name">{name}</p>
              <p className="randomchar__descr">{desc ? `${desc}`: 'Описания нет'}</p>
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
        <div className="randomchar__static">
          <p className="randomchar__title">
              Random character for today!<br/>
              Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
              Or choose another one
          </p>
          <button onClick={this.randomChar} className="button button__main">
              <span className="inner">try it</span>
          </button>
        </div>
      </section>
    )}
}

export default RandomChar;