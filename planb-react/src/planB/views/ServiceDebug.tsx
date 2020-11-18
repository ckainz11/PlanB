import React, {useEffect, useState} from "react";
import {
    useAssignedSongService,
    useBandService,
    useSessionService,
    useMemberService,
    usePersonalService,
    useSongService,
    useUserService
} from "../services";
import {Band, Session, User} from "../resources";
import {useVoteService} from "../services/serviceControllers/useVoteService";

export function ServiceDebug() {

    //Authentication
    const [me, signInWithGoogle] = usePersonalService();

    //Data
    const [users] = useUserService();

    const [selectedUser, setSelectedUser] = useState<User>();
    const [bands]= useBandService(selectedUser);


    const [selectedBand, setSelectedBand] = useState<Band>();
    const [members] = useMemberService(selectedBand);
    const [meetings] = useSessionService(selectedBand);
    const [songs]= useSongService(selectedBand);

    const [selectedMeeting, setSelectedMeeting] = useState<Session>();
    const [votes] = useVoteService(selectedBand, selectedMeeting);
    const [assSongs] = useAssignedSongService(selectedBand, selectedMeeting);


    useEffect(() => {
        setSelectedBand(undefined);
    }, [selectedUser]);

    useEffect(() => {
        setSelectedMeeting(undefined);
    }, [selectedBand]);

    return <div style={{backgroundColor: "white"}}>
        <h1>Authentication:</h1>
        <button
        onClick={(event) => {
            signInWithGoogle();
        }}
        >Authenticate with Google</button>
        <h2>Current User:</h2>
        <pre>{JSON.stringify(me, null, 2)}</pre>
        <h1>Debug:</h1>
        <form>
            {
                users?.map((user) => {
                    return <div key={user.dataBaseID}><label htmlFor={user.dataBaseID}>{user.dataBaseID}</label>
                        <input
                            // checked={selectedUser && selectedUser.dataBaseID === user.dataBaseID}
                            onChange={() => setSelectedUser(() => user)} type="radio" id={user.dataBaseID}
                            name="band"
                            value={user.dataBaseID}/><br/></div>
                })
            }
        </form>
        <h2>Bands:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
        </pre>
        {selectedUser && <div style={{backgroundColor: "lightgray"}}>
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
                <h4>Assigned Songs</h4>
                <pre>
                {JSON.stringify(assSongs, null, 2)}
            </pre>
                <h4>Votes</h4>
                <pre>
                {JSON.stringify(votes, null, 2)}
            </pre>
            </div>}
        </div>}
    </div>
}
