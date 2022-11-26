import { actorMovieDTO } from "../actors/actor.model";
import { genreDto } from "../genres/genre.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";

export interface movieDto {
    id: number;
    title: string;
    poster: string;
}

export interface movieCreationDTO {
    title: string;
    inTheaters: boolean;
    trailer: string;
    summary?: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genreIds?: number[];
    movieTheatersIds?: number[];
    actors?: actorMovieDTO[];
}

export interface landingPageDTO {
    inTheaters?: movieDto[];
    upcomingRelease?: movieDto[]
}

export interface moviesPostGetDTO {
    genres: genreDto[];
    movieTheaters: movieTheaterDTO[];
}