import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { urlGenres } from "../endpoints";
import { genreDto } from "./genre.model";

export default function IndexGenres() {

    useEffect(() => {
        axios.get(urlGenres)
            .then((response: AxiosResponse<genreDto[]>) => {
                console.log(response.data);
            })
    })

    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to="/genres/create">Create Genre</Link>
        </>
    )
}