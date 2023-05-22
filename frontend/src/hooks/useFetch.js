import { useState, useEffect, useReducer } from "react";

const url = "https://across-the-globe-backend.onrender.com/api"

const options = {headers: {Accept: "application/json"}}

const reduce = (data, action) => {
    switch (action.type){
        case 'getByTitle':
            return () => {data = fetch(`${url}/${action.language}/${action.details}`, options)
                                    .then((res) => res.json())
                                    .catch((err) => console.log(err))}
        case 'getByForeignTitle':
            return () => {data = fetch(`${url}/${action.language}/english/${action.foreignTitle}`, options)
                                    .then((res) => res.json())
                                    .catch((err) => console.log(err))}
        case 'post':
            return () => {data = fetch(`${url}/${action.language}/${action.foreignTitle}`,
                                             {method: "POST", 
                                             options, 
                                             body: JSON.stringify(action.postData)})
                                    .then((res) => res.json())
                                    .catch((err) => console.log(err))}
        default:
            return () => {data = fetch(`${url}`, options)
                            .then((res) => res.json())
                            .catch((err) => console.log(err))} 
    }
}

export const useFetch = () => {
    const [language, setLanguage] = useState("");
    const [title, setTitle] = useState("");
    const [foreignTitle, setForeignTitle] = useState();
    const [postData, setPostData] = useState();
    const [request, setAction] = useState("");
    const [data, dispatch] = useReducer(reduce, "");

    useEffect(() => {
        dispatch({  type: request, 
                    details: title, 
                    language: language, 
                    foreignTitle: foreignTitle,
                    postData: postData
                })
    }, [title, language, foreignTitle, request, postData]);

    return {
        data: data,
        setTitle: setTitle,
        setLanguageSearch: setLanguage,
        setForeignTitle: setForeignTitle,
        setAction: setAction,
        setPostData: setPostData
    }
}