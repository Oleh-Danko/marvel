import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(8)

    const {getAllComics, loading, error} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)  
        getAllComics(offset)
            .then(onComicslistloaded)
    }

    const onComicslistloaded = (newComicslist) => {
        // let ended = total - offset <= 9 ? true : false
        setComicsList(() => [...comicsList, ...newComicslist])
        setNewItemsLoading(false)
        setOffset(offset => offset + 8)
        // setCharEnded(() => ended)
    }  

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.description} className="comics__item-img"/>
                    <div className="comics__item-name">{item.description}</div>
                    <div className="comics__item-price">{item.price}$</div>
                </Link>
            </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const content = renderItems(comicsList)
    const spinner = loading && !newItemsLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                disabled={newItemsLoading}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                 >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;