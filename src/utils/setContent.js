import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>
        case 'loading': 
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Enexpected process state')
    }
}

const setContentList = (process, Component, newItemsLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
        case 'loading': 
            return newItemsLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Enexpected process state')
    }
}

export {setContent, setContentList}