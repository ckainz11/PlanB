import React from "react";
import {Container, Segment, Image, Button, Icon} from "semantic-ui-react";
import {Band, User} from "../resources";
import {useMemberService} from "../services";

export const MemberDisplay = ({band, me}: MemberDisplayProps) => {
    const [members, memberOperation] = useMemberService(band)


    return <Segment.Group>
        <Segment>Members</Segment>
        {members?.map(user => {
            return <Segment className={"member-display-row"}>
                <div>
                    <Image src={user.photoUrl} avatar/>
                    {user.userName}

                </div>
                {band.leader === me.dataBaseID && user.dataBaseID !== me.dataBaseID &&
                <Button size={"mini"} color={"red"} icon="close" onClick={() => memberOperation({type: "remove", payload: user})}/>}
            </Segment>
        })}
    </Segment.Group>


}

type MemberDisplayProps = {
    band: Band
    me: User
}