import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {getComic, getCharacter, loading, error, clearError} = useMarvelService()

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError()

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
            case 'character':
                getCharacter(id).then(onDataLoaded)
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return (
      <>
        <AppBanner/>
        {spinner}
        {errorMessage}
        {content}
      </>
    )
}

export default SingleComicPage;