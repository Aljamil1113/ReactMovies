import { Form, Formik, FormikHelpers, yupToFormErrors } from "formik";
import { movieCreationDTO } from "./movies.model.d";
import * as Yup from 'yup';
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import { useState } from "react";
import { genreDto } from "../genres/genre.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import TypeAheadActor from "../forms/TypeAheadActor";
import { actorMovieDTO } from "../actors/actor.model";

export default function MovieForm(props: movieFormProps) {

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));

    const [selectedMovieTheaters, setSelectedMovieTheaters] = 
            useState(mapToModel(props.selectedMovieTheaters));
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(mapToModel(props.nonSelectedMovieTheaters));

    const [selectedActors, setSelectedActors] = useState(props.selectedActors);

    function mapToModel(items: {id: number, name: string}[]): multipleSelectorModel[] {
        return items.map(item => {
            return {key: item.id, value: item.name}
        })
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                values.genreIds = selectedGenres.map(item => item.key);
                values.movieTheatersIds = selectedMovieTheaters.map(item => item.key);
                values.actors = selectedActors;
                props.onSubmit(values, actions)
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('This field is required').firstLetterUppercase()
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Title" field="title"/>
                    <CheckboxField displayName="In Theaters" field="inTheaters"/>
                    <TextField displayName="Trailer" field="trailer"/>
                    <DateField displayName="Release Date" field="releaseDate"/>
                    <ImageField displayName="Poster" field="poster" imageURL={props.model.posterURL}/>

                    <MultipleSelector 
                        displayName="Genres"
                        nonSelected={nonSelectedGenres}
                        selected={selectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}
                    />

                        <MultipleSelector 
                        displayName="Movie Theaters"
                        nonSelected={nonSelectedMovieTheaters}
                        selected={selectedMovieTheaters}
                        onChange={(selected, nonSelected) => {
                            setSelectedMovieTheaters(selected);
                            setNonSelectedMovieTheaters(nonSelected);
                        }}
                    />

                    <TypeAheadActor displayName="Actors" actors={selectedActors} 
                    onAdd={actors => {
                        setSelectedActors(actors);
                    }} />

                    <Button disabled={formikProps.isSubmitting} type='submit' >Save Changes</Button>
                    <Link className="btn btn-secondary" to="/movies">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface movieFormProps {
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>) : void;
    selectedGenres: genreDto[];
    nonSelectedGenres: genreDto[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
    selectedActors: actorMovieDTO[];
}