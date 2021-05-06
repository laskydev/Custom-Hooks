import {useEffect, useRef, useState} from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const initialState = {
        data: null,
        loading: true,
        error: null
    }


    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const [state, setState] = useState(initialState)

    useEffect(() => {
        setState(initialState)
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data: data
                    })
                }
            })
    }, [url])

    return state
}
