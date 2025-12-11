import { useHttp } from "../hooks/http.hooks";

export const useMarvelService = () => {
    const {isLoading, isError, request,clearError } = useHttp()
    const API_BASE = 'https://marvel-server-zeta.vercel.app/';    
    const API_KEY = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'
    const BASE_OFFSET = 0;
   
    const getAllCharacters = async (offset = BASE_OFFSET) => {
        const res = await request(`${API_BASE}characters?limit=9&offset=${offset}&${API_KEY}`);
        return res.data.results.map(transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${API_BASE}characters/${id}?${API_KEY}`);
        return transformCharacter(res.data.results[0])
    }
    const getAllComics  = async (offset = BASE_OFFSET) => {
        const res = await request(`${API_BASE}comics?limit=9&offset=${offset}&${API_KEY}`);
        return res.data.results.map(transformComics);
    };
    const getComic = async (id) => {
        const res = await request(`${API_BASE}comics/${id}?${API_KEY}`);
        return transformComics(res.data.results[0]);
    };
    
    const transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 20)}...`
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};
    const transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};
    return { isLoading, isError, getAllCharacters, getCharacter, getAllComics  ,getComic,  clearError}
}

