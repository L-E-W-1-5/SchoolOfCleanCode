import { useState, useEffect, useReducer } from "react";

//const url = "https://across-the-globe-backend.onrender.com/api"
const url = "http://localhost:3001/api"

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
            return fetch(`${url}/${action.language}`, options)
                            .then((res) => res.json())
                            .catch((err) => console.log(err))} 
    }


export const useFetch = () => {
  
    const [request, setAction] = useState();
    const [data, dispatch] = useReducer(reduce, "");

    useEffect(() => {
        if(request)
        dispatch({  type: request.request, 
                    details: request.title, 
                    language: request.language, 
                    foreignTitle: request.foreignTitle,
                    postData: request.postData
                })
    }, [request]);

    return {
        data: data,
        
        setAction: setAction,
       
    }
}