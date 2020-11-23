import React, {useContext} from "react";
import {useBandService, usePersonalService} from "../services";
import {BandContext} from "../contexts";

export const BandSelection = () => {

    const [user] = usePersonalService();
    const [bands] = useBandService(user);
    const [currentBand] = useContext(BandContext);


    return <div>
        {!currentBand && <p>yo wähl mal band aus</p>}
        {bands?.length == 0 && <p>yo bist in keiner band</p>}

    </div>
}