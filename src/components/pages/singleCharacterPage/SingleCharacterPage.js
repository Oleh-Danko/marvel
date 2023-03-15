import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleCharacterPage.scss'

const SingleCharacterPage = ({data}) => {
    const {thumbnail, name, description} = data
    console.log(data)

    return (
        <div className="single-character">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character pages`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt="character img" />
            <div className="single-character__info">
                <h2 className="single-character__title">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage