import MovieTheaterForm from "./movieTheaterForm";

export default function EditMovieTheater() {
    return (
        <>
            <h3>Edit Movie Theater</h3>
            <MovieTheaterForm model={{name: 'Ako', latitude: 18, longitude: -69 }}
            onSubmit={values => console.log(values)}/>
            {/* <Link to="/movietheaters/edit">Edit Movie Theater</Link> */}
        </>
    )
}