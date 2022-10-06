import GenericList from "../utils/GenericList";
import IndividualMovie from "./IndividualMovie";
import { movieDto } from "./movies.model.d";
import css from './MoviesList.module.css'

export default function MovieList(props: movieListProps) {
    return <GenericList 
    list={props.movies} >
        <div className={css.div}>
            {props.movies?.map(movie => 
                <IndividualMovie {...movie} key={movie.id} />
                )}
        </div>
    </GenericList>
}

interface movieListProps {
    movies?: movieDto[];
}