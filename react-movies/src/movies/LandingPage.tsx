import { useEffect, useState } from "react";
import { landingPageDTO } from "./movies.model.d";
import MoviesList from "./MoviesList";


export default function LandingPage() {
    const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [
          {
            id: 1,
            title: 'Spider-Man: Far From Home',
            poster: 'https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/Spider-Man-FarFromHome-rating.jpg?itok=CGe-MMMn'
          },
          {
            id: 2,
            title: 'Black Panther: Wakanda Forever',
            poster: 'data:image/jpeg;base64,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'
          }
        ],
        upcomingRelease: [
          {
            id: 3,
            title: 'One Piece Film Red',
            poster: 'https://upload.wikimedia.org/wikipedia/en/4/44/One_Piece_Film_Red_Visual_Poster.jpg'
          },
          {
            id: 4,
            title: 'John Wick',
            poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/John_Wick_Chapter_3_Parabellum.png/220px-John_Wick_Chapter_3_Parabellum.png'
          }
        ]
      })
    }, 4000)

    return () => clearTimeout(timerId);
  });
  
    return (
        <>
             <h3>In Theaters</h3>
            <MoviesList movies={movies.inTheaters}/>

            <h3>Upcoming Realease</h3>
            <MoviesList movies={movies.upcomingRelease}/>
        </>     
    );
}