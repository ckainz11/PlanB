import React, {useContext} from "react";
import {useBandService, usePersonalService} from "../services";
import {BandContext} from "../contexts";
import {NoBand} from "./NoBand";

export const BandSelection = () => {

    const [user] = usePersonalService();
    const [bands] = useBandService(user);
    const [currentBand] = useContext(BandContext);

    if (bands) {
        return <div>
            {!currentBand &&
            <div>
                {bands.length > 0 ?
                    <p>yo wähl mal band aus</p>
                    :
                    <NoBand/>
                }
            </div>}
        </div>
    } else {
        return <div><p>loading...</p></div>
    }
}
