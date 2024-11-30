import { useState, useEffect } from "react";


export const useLoadEntity = (url, withCredentials = false) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [data, setData] = useState(undefined);

    useEffect(
        () => {
            setError(undefined);
            setData(undefined);
            setIsLoading(true);

            const abortController = new AbortController();
            let headers = {};
            if (withCredentials) {
                let token = JSON.parse(localStorage.getItem("token"))
                if (!token) {
                    setIsLoading(false);
                    setError(new Error("Authentication error!"));
                    setData(undefined);
                    return
                }
                headers = {
                    "authorization": `Bearer ${token.token}`
                }
            }

            fetch(url, {
                mode: 'cors',
                headers: {
                    ...headers
                },
                signal: abortController.signal
            }).then(
                res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(new Error("Unexpected error!"));
                }
            ).then(
                data => {
                    setData(data);
                    setIsLoading(false);
                }, (err) => {
                    if (!abortController.signal.aborted) {
                        setError(err);
                        setIsLoading(false);
                    }
                }
            )
            return () => {
                abortController.abort();
            }
        }, [url, withCredentials]
    );
    return {isLoading, data, error}
}
