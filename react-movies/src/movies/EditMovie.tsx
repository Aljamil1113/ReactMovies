import { actorMovieDTO } from "../actors/actor.model";
import { genreDto } from "../genres/genre.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie() {

    const nonSelectedGenres: genreDto[] = [{id: 2, name: 'Drama'}]
    const selectedGenres: genreDto[] = [{id: 1, name: 'Comedy'}]

    const nonSelectedMovieTheaters: movieTheaterDTO[] = [{id: 1, name: 'Sambil'}]
    const selectedMovieTheaters: movieTheaterDTO[] = [{id: 2, name: 'Agora'}]

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
            <h3>Edit Movie</h3>
            <MovieForm model={{title: 'Toy Story', inTheaters: true, trailer: 'url', releaseDate: new Date('2019-01-01T00:00:00')}}
                onSubmit={values => console.log(values)}
                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={selectedGenres}

                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedMovieTheaters={selectedMovieTheaters}

                selectedActors={actors}
            />
        </>
    )
}