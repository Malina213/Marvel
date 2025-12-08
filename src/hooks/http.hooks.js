

import { useCallback, useState } from 'react';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const request = useCallback(async(url,method = 'GET', body = null) => {
        setIsLoading(true);

        try{
            const responce = await fetch(url,{method,body})

            if(!responce.ok) throw new Error(`Could now fetch ${url},status:${responce.status}`)
            
            const date = await responce.json();

            setIsLoading(false);

            return date
            
        }catch (e){
            setIsLoading(false);
            setIsError(e.message)

            throw e
        }
    },[])

    const clearError = useCallback(() => setIsError(null),[])
       
    return {isLoading, isError, request, clearError}
    
}