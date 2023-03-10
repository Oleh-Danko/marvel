import { Link } from 'react-router-dom';
import './singleCharacterPage.scss'

const SingleCharacterPage = ({data}) => {
    const {thumbnail, title, description} = data

    return (
        <div className="single-character">
            <img src={thumbnail} alt="character img" />
            <div className="single-character__info">
                <h2 className="single-character__title">{title}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage