import React from "react";
import {Band} from "../resources";
import {useMemberService} from "../services";
import {Image} from "semantic-ui-react"


export const BandMembers = ({band}: BandMembersProps) => {

    const [members] = useMemberService(band)

    return <div>
        {members?.map(m => {
            return <Image key={m.dataBaseID} className="band-member" size={"tiny"} avatar src={m.photoUrl} />
        })}
    </div>
}

type BandMembersProps = {
    band: Band
}
