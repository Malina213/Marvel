import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";


function App(){
    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => setSelectedChar(id);
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                    <Route exact path='/'>
                        <ErrorBoundary>
                            <RandomChar/>
                        </ErrorBoundary>
                        <section className="char__content">
                            <ErrorBoundary>
                                <CharList onCharSelected={onCharSelected}/>
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <CharInfo charID={selectedChar}/>
                            </ErrorBoundary>
                        </section>
                    </Route>
                    

                    <Route exact path='/comics'>
                        <ErrorBoundary>
                            <ComicsList />
                        </ErrorBoundary>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>   
                    </Switch>              
                </main>
            </div>
        </Router>
       
    )
        
}

export default App;