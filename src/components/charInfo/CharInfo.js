import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
  
    const {getCharacter, loading, error, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])

    // componentDidUpdate(prevProps) {
    //     if (props.charId !== prevProps.charId)  updateChar()
    // }
    const updateChar = () => {
        const {charId} = props
        if (!charId) return

        clearError()
        
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = loading || error ||  char ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const view = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {view}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const img = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const objFit = thumbnail === img ? {objectFit: 'contain'} : null


    const getUrlComic = (url) => {
        console.log(url)
    }

    return (
        <>
             <div className="char__basics">
                <img src={thumbnail} alt="abyss"
                    style={objFit} />
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
            <div className="char__descr">
                {description}
            </div>

            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Tere is no comiscs with this character'}   
                {
                    comics.map((elem, i) => {  
                        // eslint-disable-next-line            
                        if (i > 9) return
                        return (
                            <li className="char__comics-item" key={i}>
                                <Link to={`/comics/${elem.resourceURI.slice(elem.resourceURI.length - 7).replace(/\D/g, '')}`}>
                                {elem.name}
                                </Link>     
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;