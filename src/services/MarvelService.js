import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
    const {error, loading, request, clearError} = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/characters'
    const _apiKey = '63e57abe42ed792f30fea9351aa5a09c'
    const _apiComics = 'https://gateway.marvel.com:443/v1/public/comics'
    const _basicOffset = 210
    const _comicsOffset = 8
  
    const getComic = async (id) => {
        const res = await request(`${_apiComics}/${id}?apikey=${_apiKey}`)
        return _transformComics(res.data.results[0])

    }

    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(`${_apiComics}?limit=8&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

     const getAllCharacters = async (offset = _basicOffset) => {
        const res = await request(`${_apiBase}?limit=9&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformCharacter)

    }

    const getTotalCharacters = async () => {
        const res = await request(`${_apiBase}?&apikey=${_apiKey}`)
        return res.data.total
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/${id}?apikey=${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }
    
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}?name=${name}&apikey=${_apiKey}`)
        // console.log(res.data.results[0])
        // return _transformCharacter(res.data.results[0])
        return res.data.results.map(_transformCharacter)
    }
    // const getCharacterByName = async (name) => {
	// 	const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
	// 	return res.data.results.map(_transformCharacter);
	// };

    const _transformComics = (comics) => {
        return {
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            title: comics.title,
            id: comics.id,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'NNo information about the number of pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ?  `${comics.prices.price}` : 'not available'
        }
    }

    const _transformCharacter = (char) => {
        const descr = 'Sorry, but there is no information about this character'
        const des = char.description.length <= 0 ? descr : char.description

        return {
            name: char.name,
            description: char.description.length > 210 ? des.slice(0, 210) + '...': des,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    return {getTotalCharacters, getAllCharacters, getCharacter, loading, error, clearError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService



