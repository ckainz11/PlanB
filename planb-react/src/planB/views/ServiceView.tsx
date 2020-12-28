import React, {useEffect, useState} from "react";
import {
    useAssignSongService,
    useBandService,
    useSessionService,
    useMemberService,
    usePersonalService,
    useSongService, useUserService
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
    const [users] = useUserService()

    //User
    const [selectedBand, setSelectedBand] = useState<Band>();
    const [members, memberOperation] = useMemberService(selectedBand);
    const [sessions, sessionOperation] = useSessionService(selectedBand);

    //Band
    const [selectedMeeting, setSelectedMeeting] = useState<Session>();
    const [assSongs, assOperation] = useAssignSongService(selectedBand, selectedMeeting);
    const [songs, songOperation] = useSongService(selectedBand)

    //Forms
    const [addMemberUid, setAddMemberUid] = useState("");
    const [removeSessionId, setRemoveSessionId] = useState("");
    const [removeBandId, setRemoveBandId] = useState("");
    const [removeSongId, setRemoveSongId] = useState("");
    const [removeMemberID, setRemoveMemberId] = useState("");
    const [assignSongId, setAssignSongId] = useState("");
    const [unAssignSongId, setUnAssignSongId] = useState("");
    const [searchUserEmail, setSearchUserEmail] = useState("");


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
        <form onSubmit={(event) => {
            if (!users) {
                console.log("Not able to load users");
                return;
            }
            event.preventDefault();
            const user = users.find((user) => {
                return user.email === searchUserEmail
            });
            if (user) {
                alert(JSON.stringify(user, null, 2));
            } else {
                alert("No user found");
            }
        }}>
            <input onChange={(e) => setSearchUserEmail(e.target.value)} value={searchUserEmail} type="text"
                   placeholder={"email"}/>
            <button type={"submit"}>Search user by email</button>
        </form>

        <h2>Bands:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
        </pre>

        <form onSubmit={(event) => {
            event.preventDefault();
            console.log(`Add random band`)
            bandOperation({
                type: "add",
                payload: {
                    dataBaseID: "noID",
                    name: faker.company.companyName(),
                    description: faker.company.catchPhrase(),
                    leader: me ? me.dataBaseID : ""
                }
            });
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
                songOperation({
                    type: "add",
                    payload: {dataBaseID: "", name: faker.random.word(), content: faker.hacker.phrase(), rating: 5}
                });
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
                    <h4>Assigned Songs</h4>
                    <pre>
                        {JSON.stringify(assSongs, null, 2)}
                    </pre>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        console.log(`Assign Song ${addMemberUid}`)
                        assOperation({type: "add", payload: {dataBaseID: assignSongId} as Song});
                    }}>
                        <input onChange={(e) => setAssignSongId(e.target.value)} value={assignSongId} type="text"
                               placeholder={"uid"}/>
                        <button type={"submit"}>Assign song</button>
                    </form>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        console.log(`Un assign song ${unAssignSongId}`)
                        assOperation({type: "remove", payload: {dataBaseID: unAssignSongId} as Song});
                    }}>
                        <input onChange={(e) => setUnAssignSongId(e.target.value)} value={unAssignSongId} type="text"
                               placeholder={"uid"}/>
                        <button type={"submit"}>Un asign song</button>
                    </form>
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
