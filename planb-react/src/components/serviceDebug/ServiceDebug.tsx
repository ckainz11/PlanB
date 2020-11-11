import React from "react";
import {useBandService, useMeetingService} from "../../services";

export function ServiceDebug () {
    const {bands} = useBandService();
    const {meetings} = useMeetingService(bands && bands[1]);

    return <div>
        <h1>Debug:</h1>
        <h2>Bands:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
        </pre>
        <div style={{backgroundColor: "gray"}}>
            <h2>Meetings</h2>
            <pre>
                {JSON.stringify(meetings, null, 2)}
            </pre>
        </div>
    </div>
}
