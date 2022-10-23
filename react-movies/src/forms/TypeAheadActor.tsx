import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actor.model";
 

export default function TypeAheadActors(props: typeAheadActorsProps) {   
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
    <div className="mb-3">
        <label>{props.displayName}</label>

        <Typeahead id="typeahead"  
            onChange={actors => { 
                // if(props.actors.findIndex(x => x.id === actors[0].id ) === -1) {
                //     props.onAdd([...props.actors, actors[0]])
                // }
                console.log(actors);
            }}
        options={actors} labelKey="name" filterBy={['name']}
            placeholder="Write the name of the actor..." minLength={1} flip={true} />
    </div>
    )
}

interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]) : void;
}