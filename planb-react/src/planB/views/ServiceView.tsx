import React, {useEffect, useState} from "react";
import {
    useAssignedSongService,
    useBandService,
    useSessionService,
    useMemberService,
    usePersonalService,
    useSongService, useProposerService,
} from "../services";
import {Band, Session, Song, User} from "../resources";
import {useVoteService} from "../services/serviceControllers/useVoteService";
import {Link} from "react-router-dom";
import faker from 'faker';



export function ServiceView() {

    //Authentication
    const [me, personalOperation] = usePersonalService();

    //Data
    const [bands, bandOperation] = useBandService(me);

    //User
    const [selectedBand, setSelectedBand] = useState<Band>();
    const [members, memberOperation] = useMemberService(selectedBand);
    const [sessions, sessionOperation] = useSessionService(selectedBand);

    //Band
    const [selectedMeeting, setSelectedMeeting] = useState<Session>();
    const [assSongs] = useAssignedSongService(selectedBand, selectedMeeting);
    const [proposer] = useProposerService(selectedBand, selectedMeeting);
    const [songs, songOperation] = useSongService(selectedBand)

    //Forms
    const [addMemberUid, setAddMemberUid] = useState("");
    const [removeSessionId, setRemoveSessionId] = useState("");
    const [removeBandId, setRemoveBandId] = useState("");
    const [removeSongId, setRemoveSongId] = useState("");
    const [removeMemberID, setRemoveMemberId] = useState("");


    useEffect(() => {
        setSelectedBand(undefined);
    }, [me]);

    useEffect(() => {
        setSelectedMeeting(undefined);
    }, [selectedBand]);

    return <div className={"serviceView"}>
        <Link to={""}>Back To landing page</Link>
        <h1>Authentication:</h1>
        {!me ?
            <button onClick={() => personalOperation({type: "signInWithGoogle"})}>Authenticate with Google</button>
            :
            <button onClick={() => personalOperation({type: "signOut"})}>Sign out </button>
        }
        <h2>Current User:</h2>
        <pre>{JSON.stringify(me, null, 2)}</pre>

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
        {selectedBand && <div>
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
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(`Remove member ${removeMemberID}`)
                memberOperation({type: "remove", payload: {dataBaseID: removeMemberID} as User});
            }}>
                <input onChange={(e) => setRemoveMemberId(e.target.value)} value={removeMemberID} type="text"
                       placeholder={"uid"}/>
                <button type={"submit"}>Remove member</button>
            </form>
            <h4>Sessions</h4>
            <pre>
            {JSON.stringify(sessions, null, 2)}
            </pre>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(`Remove session ${removeSessionId}`)
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
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(`Add random song`)
                songOperation({type: "add", payload: {dataBaseID: "", name: faker.random.word(), content: faker.hacker.phrase(), rating: 5}});
            }}>
                <button type={"submit"}>Add random song</button>
            </form>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(`Remove song ${removeSongId}`)
                songOperation({type: "remove", payload: {dataBaseID: removeSongId} as Song});
            }}>
                <input onChange={(e) => setRemoveSongId(e.target.value)} value={removeSongId} type="text"
                       placeholder={"uid"}/>
                <button type={"submit"}>Remove song</button>
            </form>

            {selectedBand && <div>
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
                {selectedMeeting && <div>
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
