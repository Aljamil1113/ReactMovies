import { actorMovieDTO } from "../actors/actor.model";
import { genreDto } from "../genres/genre.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";
import { movieCreationDTO } from "./movies.model";

export default function CreateMovie() {

    const nonSelectedGenres: genreDto[] = [{id: 1, name: 'Comedy'}, {id: 2, name: 'Drama'}]
    const nonSelectedMovieTheaters: movieTheaterDTO[] = [{id: 1, name: 'Sambil'}, {id: 2, name: 'Agora'}]

    const actors: actorMovieDTO[] = [{
        id: 1, name: 'Felipe', character: '', picture: 'https://en.wikipedia.org/wiki/File:John_Cena_July_2018.jpg'
    },
    {
        id: 2, name: 'Fernando', character: '', picture: 'https://en.wikipedia.org/wiki/File:Brock_Lesnar_in_March_2015.jpg'
    },
    {
        id: 3, name: 'Jessica', character: '', picture: 'https://en.wikipedia.org/wiki/File:StacyKeibler2011.jpeg'
    }];

    return (
        <>
            <h3>Create Movie</h3>
            <MovieForm model={{title: '', inTheaters: false, trailer: ''}} 
            onSubmit={values => console.log(values)}
            nonSelectedGenres={nonSelectedGenres}
            selectedGenres={[]}

            nonSelectedMovieTheaters={nonSelectedMovieTheaters}
            selectedMovieTheaters={[]}

            selectedActors={actors}
            />
        </>
    )
}