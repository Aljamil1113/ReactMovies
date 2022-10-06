import { movieDto } from "./movies.model.d";
import css from './IndividualMovie.module.css';

export default function IndividualMovie(props: movieDto) {
    const buildLink = () => `movie/${props.id}`

    return (
        <div className={css.div}>
            <a href={buildLink()}>
                <img alt="Poster" src={props.poster}/>
            </a>
            <p>
                <a href={buildLink()} >{props.title}</a>
            </p>
        </div>
    )
}