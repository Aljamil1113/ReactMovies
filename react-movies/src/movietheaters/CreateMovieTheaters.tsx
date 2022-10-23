import MovieTheaterForm from "./movieTheaterForm";

export default function CreateMovieTheater() {
    return (
        <>
            <h3>Create Movie Theater</h3>
            <MovieTheaterForm model={{name: '', latitude: 0, longitude: 0}}
            onSubmit={values => console.log(values)}/>
            {/* <Link to="/movietheaters/create">Create Movie Theater</Link> */}
        </>
    )
}