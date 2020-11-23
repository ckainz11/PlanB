import React, {useContext} from "react";
import {useBandService, usePersonalService} from "../services";
import {BandContext} from "../contexts";

export const BandSelection = () => {

    const [user] = usePersonalService();
    const [bands] = useBandService(user);
    const [currentBand] = useContext(BandContext);

    if (bands) {
        return <div>
            {!currentBand &&
            <div>
                {bands.length > 0 ?
                    <p>yo check mal band aus</p>
                    :
                    <p>yo du hast keine band</p>
                }
            </div>}
        </div>
    } else {
        return <div><p>loading...</p></div>
    }
}
