import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {getComic, loading, error, clearError} = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])

    // componentDidUpdate(prevProps) {
    //     if (props.charId !== prevProps.charId)  updateChar()
    // }
    const updateComic = () => {
        clearError()
        
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
      <>
        {spinner}
        {errorMessage}
        {content}
      </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, description, pageCount, language, price} = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="singl  e-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;