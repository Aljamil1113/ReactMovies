import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertActorToFormData } from "../utils/formDataUtil";
import { actorCreationDTO, actorDto } from "./actor.model";
import ActorForm from "./ActorForm";

export default function EditActor() {
    function transform(actor: actorDto) : actorCreationDTO {
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }
     return (
        <EditEntity<actorCreationDTO, actorDto>
            url={urlActors} indexUrl="/actors" entityName="Actor"
            transformFormData={convertActorToFormData}
            transform={transform}
            >
                {(entity, edit) => 
                    <ActorForm 
                        model={entity}
                        onSubmit={async values => await edit(values)}
                    />
                }
        </EditEntity>
    )
}