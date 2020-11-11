import React from "react";
import {useBandService} from "../../services";

export function ServiceDebug () {
    const {bands, selectBand} = useBandService();

    return <div>
        <h2>Debug:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
        </pre>
    </div>
}
