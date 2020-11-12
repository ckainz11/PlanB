import React, {useEffect, useState} from "react";
import {useBandService, useMeetingService} from "../../services";
import {useSongService} from "../../services/serviceControllers/useSongService";
import {useAssignedSongService} from "../../services/serviceControllers/useAssignedSongService";
import {Band, User} from "../../resources";
import {useUserService} from "../../services/serviceControllers/useUserService";
import {useMemberService} from "../../services/serviceControllers/useMemberService";

export function ServiceDebug() {
    const {users} = useUserService();

    const [selectedUser, setSelectedUser] = useState<User>();
    const {bands} = useBandService(selectedUser);


    const [selectedBand, setSelectedBand] = useState<Band>();
    const {members} = useMemberService(selectedBand);
    const {meetings} = useMeetingService(selectedBand);
    const {songs} = useSongService(selectedBand);
    useEffect(() => {
        if (bands) {
            setSelectedBand(bands[0]);
        } else {
            setSelectedBand(undefined);
        }
    }, [bands]);

    return <div>
        <h1>Debug:</h1>
        <form>
            {
                users?.map((user) => {
                    return <div key={user.dataBaseID}><label htmlFor={user.dataBaseID}>{user.dataBaseID}</label>
                        <input checked={selectedUser && selectedUser.dataBaseID === user.dataBaseID} onChange={() => setSelectedUser(() => user)} type="radio" id={user.dataBaseID} name="band"
                               value={user.dataBaseID}/><br/></div>
                })
            }
        </form>
        <h2>Bands:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
        </pre>
        <div style={{backgroundColor: "lightgray"}}>
            <form>
                {
                    bands?.map((band) => {
                        return <div key={band.dataBaseID}><label htmlFor={band.dataBaseID}>{band.dataBaseID}</label>
                            <input checked={selectedBand && selectedBand.dataBaseID === band.dataBaseID} onChange={() => setSelectedBand(() => band)} type="radio" id={band.dataBaseID} name="band"
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
        </div>
    </div>
}
