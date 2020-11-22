import React, {useEffect, useState} from "react";
import {
    useAssignedSongService,
    useBandService,
    useSessionService,
    useMemberService,
    usePersonalService,
    useSongService,
} from "../services";
import {Band, Session, User} from "../resources";
import {useVoteService} from "../services/serviceControllers/useVoteService";
import {Link} from "react-router-dom";

export function ServiceView() {

    //Authentication
    const [me, personalOperation] = usePersonalService();

    //Data
    const [bands] = useBandService(me);

    const [selectedBand, setSelectedBand] = useState<Band>();
    const [members] = useMemberService(selectedBand);
    const [meetings] = useSessionService(selectedBand);
    const [songs] = useSongService(selectedBand);

    const [selectedMeeting, setSelectedMeeting] = useState<Session>();
    const [assSongs] = useAssignedSongService(selectedBand, selectedMeeting);


    useEffect(() => {
        setSelectedBand(undefined);
    }, [me]);

    useEffect(() => {
        setSelectedMeeting(undefined);
    }, [selectedBand]);

    return <div style={{backgroundColor: "white"}}>
        <Link to={""}>Back To landing page</Link>
        <h1>Authentication:</h1>
        {!me ?
            <button onClick={() => personalOperation({type: "signInWithGoogle"})}>Authenticate with Google</button>
            :
            <button onClick={() => personalOperation({type: "signOut"})}>Sign out </button>
        }
        <h2>Current User:</h2>
        <pre>{JSON.stringify(me, null, 2)}</pre>
        {/*<h1>Debug for:</h1>*/}
        {/*<form>*/}
        {/*    {*/}
        {/*        user?.map((user) => {*/}
        {/*            return <div key={user.dataBaseID}>*/}
        {/*                <label htmlFor={user.dataBaseID}>{user.userName}</label>*/}
        {/*                <input*/}
        {/*                    onChange={() => setSelectedUser(() => user)}*/}
        {/*                    type="radio"*/}
        {/*                    id={user.dataBaseID}*/}
        {/*                    name="band"*/}
        {/*                    value={user.userName}/>*/}
        {/*            </div>*/}
        {/*        })*/}
        {/*    }*/}
        {/*</form>*/}
        <h2>Bands:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
            </pre>
        {<div style={{backgroundColor: "lightgray"}}>
            <form>
                {
                    bands?.map((band) => {
                        return <div key={band.dataBaseID}><label htmlFor={band.dataBaseID}>{band.dataBaseID}</label>
                            <input
                                // checked={selectedBand && selectedBand.dataBaseID === band.dataBaseID}
                                onChange={() => setSelectedBand(() => band)} type="radio" id={band.dataBaseID}
                                name="band"
                                value={band.dataBaseID}/><br/></div>
                    })
                }
            </form>
            <h4>Members</h4>
            <pre>
            {JSON.stringify(members, null, 2)}
            </pre>
            <h4>Meetings</h4>
            <pre>
            {JSON.stringify(meetings, null, 2)}
            </pre>
            <h4>Songs</h4>
            <pre>
            {JSON.stringify(songs, null, 2)}
            </pre>

            {selectedBand && <div style={{backgroundColor: "gray"}}>
                <form>
                    {
                        meetings?.map((meeting) => {
                            return <div key={meeting.dataBaseID}><label
                                htmlFor={meeting.dataBaseID}>{meeting.dataBaseID}</label>
                                <input
                                    // checked={selectedBand && selectedBand.dataBaseID === meeting.dataBaseID}
                                    onChange={() => setSelectedMeeting(() => meeting)} type="radio"
                                    id={meeting.dataBaseID} name="band"
                                    value={meeting.dataBaseID}/><br/></div>
                        })
                    }
                </form>
                {selectedMeeting && <div style={{backgroundColor: "darkgray"}}>
                    <h4>Assigned Songs</h4>
                    <pre>
                        {JSON.stringify(assSongs, null, 2)}
                    </pre>
                    <h4>Votes</h4>
                    {members?.map(user => {
                        return <div key={user.dataBaseID}>
                            <p>
                                {user.userName}:
                                {<VoteDisplay user={user} band={selectedBand} session={selectedMeeting} />}
                            </p>
                        </div>
                    })}
                </div>}
            </div>}
        </div>}
    </div>
}

function VoteDisplay({user, band, session}: { user: User, band: Band, session: Session }) {
    const [vote] = useVoteService(user, band, session);

    return <pre>
                {JSON.stringify(vote, null, 2)}
            </pre>
}
