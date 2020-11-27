import React, {useEffect, useState} from "react";
import {
    useAssignedSongService,
    useBandService,
    useSessionService,
    useMemberService,
    usePersonalService,
    useSongService, useLeaderService, useProposerService,
} from "../services";
import {Band, Session, User} from "../resources";
import {useVoteService} from "../services/serviceControllers/useVoteService";
import {Link} from "react-router-dom";
import faker from 'faker'



export function ServiceView() {

    //Authentication
    const [me, personalOperation] = usePersonalService();

    //Data
    const [bands, bandOperation] = useBandService(me);

    const [selectedBand, setSelectedBand] = useState<Band>();
    const [members, memberOperation] = useMemberService(selectedBand);
    const [leaders, leaderOperation] = useLeaderService(selectedBand);
    const [sessions, sessionOperation] = useSessionService(selectedBand);
    const [songs] = useSongService(selectedBand);

    const [selectedMeeting, setSelectedMeeting] = useState<Session>();
    const [assSongs] = useAssignedSongService(selectedBand, selectedMeeting);
    const [proposer] = useProposerService(selectedBand, selectedMeeting);

    //Forms
    const [addMemberUid, setAddMemberUid] = useState("");
    const [removeSessionId, setRemoveSessionId] = useState("");
    const [removeBandId, setRemoveBandId] = useState("");


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

        <form onSubmit={(event) => {
            event.preventDefault();
            console.log(`Add random band`)
            bandOperation({type: "add", payload: {dataBaseID: "noID", name: faker.company.companyName(), description: faker.company.catchPhrase()}});
        }}>
            <button type={"submit"}>Add random band</button>
        </form>

        <form onSubmit={(event) => {
            event.preventDefault();
            console.log(`Remove band ${addMemberUid}`)
            bandOperation({type: "remove", payload: {dataBaseID: removeBandId} as Band});
        }}>
            <input onChange={(e) => setRemoveBandId(e.target.value)} value={removeBandId} type="text"
                   placeholder={"id"}/>
            <button type={"submit"}>Remove band</button>
        </form>

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
        {selectedBand && <div style={{backgroundColor: "lightgray"}}>
            <h4>Members</h4>
            <pre>
            {JSON.stringify(members, null, 2)}
            </pre>

            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(`Add member ${addMemberUid}`)
                memberOperation({type: "add", payload: {dataBaseID: addMemberUid} as User});
            }}>
                <input onChange={(e) => setAddMemberUid(e.target.value)} value={addMemberUid} type="text"
                       placeholder={"uid"}/>
                <button type={"submit"}>Add member</button>
            </form>
            <h4>Sessions</h4>
            <pre>
            {JSON.stringify(sessions, null, 2)}
            </pre>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(`Remove session ${addMemberUid}`)
                sessionOperation({type: "remove", payload: {dataBaseID: removeSessionId} as Session});
            }}>
                <input onChange={(e) => setRemoveSessionId(e.target.value)} value={removeSessionId} type="text"
                       placeholder={"uid"}/>
                <button type={"submit"}>Remove meeting</button>
            </form>
            <h4>Songs</h4>
            <pre>
            {JSON.stringify(songs, null, 2)}
            </pre>

            {selectedBand && <div style={{backgroundColor: "gray"}}>
                <form>
                    {
                        sessions?.map((meeting) => {
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
                    <h4>Proposer: {proposer?.userName}</h4>
                    <h4>Assigned Songs</h4>
                    <pre>
                        {JSON.stringify(assSongs, null, 2)}
                    </pre>
                    <h4>Votes</h4>
                    {members?.map(user => {
                        return <div key={user.dataBaseID}>
                            <p>
                                {user.userName}:
                                {<VoteDisplay user={user} band={selectedBand} session={selectedMeeting}/>}
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
