import React, {useEffect, useState} from "react";
import {useBandService, useMeetingService} from "../../services";
import {useSongService} from "../../services/serviceControllers/useSongService";
import {Band, User} from "../../resources";
import {useUserService} from "../../services/serviceControllers/useUserService";

export function ServiceDebug() {
    const {users} = useUserService();

    const [selectedUser, setSelectedUser] = useState<User>();
    const {bands} = useBandService(selectedUser);


    const [selectedBand, setSelectedBand] = useState<Band>();
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
                    return <div key={user.uid}><label htmlFor={user.uid}>{user.uid}</label>
                        <input checked={selectedUser && selectedUser.uid === user.uid} onChange={() => setSelectedUser(() => user)} type="radio" id={user.uid} name="band"
                               value={user.uid}/><br/></div>
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
                        return <div key={band.name}><label htmlFor={band.name}>{band.name}</label>
                            <input checked={selectedBand && selectedBand.name === band.name} onChange={() => setSelectedBand(() => band)} type="radio" id={band.name} name="band"
                                   value={band.name}/><br/></div>
                    })
                }
            </form>
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
