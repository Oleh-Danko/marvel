import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService'
import { setContentList } from '../../utils/setContent';

import './charList.scss';

const CharList = (props) => {
    const [charlist, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    const [total, setTotal] = useState(1562)

    const {getAllCharacters, loading, error, process, setProcess} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)

        // window.addEventListener('scroll', () => {
        //     let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        //     let clientHeight = window.pageYOffset + document.documentElement.clientHeight + 1

        //     if ((clientHeight >= scrollHeight)) onRequest(offset)
        // });
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)  
        getAllCharacters(offset)
            .then(onCharlistloaded)
            .then(() => setProcess('confirmed'))
    }
    
    const onCharlistloaded = (newCharlist) => {
        let ended = total - offset <= 9 ? true : false

        setCharList(() => [...charlist, ...newCharlist])
        setNewItemsLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(() => ended)
    }  

    const itemsRef = useRef([])

    const focusOnItem = (id) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'))
        itemsRef.current[id].classList.add('char__item_selected')
        itemsRef.current[id].focus()
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const img = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            const imgStyle = item.thumbnail === img ? {objectFit: 'contain'} : null

            return (
                <CSSTransition key={item.id} timeout={700} classNames="char__item">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemsRef.current[i] = el}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(item.id)
                                focusOnItem(i)
                            }
                        }}
                        onClick={() => {
                            props.onCharSelected(item.id)
                            focusOnItem(i) }} >     
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <TransitionGroup component={'ul'} className="char__grid">
                {items}
            </TransitionGroup>
        )
    }

    const elements = useMemo(() => {
        return setContentList(process, () =>renderItems(charlist), newItemsLoading)
    }, [process])

    return (
        <div className="char__list">
            {elements}
                
            <button className="button button__main button__long"
                disabled={newItemsLoading}
                onClick={() => onRequest(offset)}
                style={{display: charEnded ? 'none' : 'block'}}
                 >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.defaultProps = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;