import React, {useContext} from "react";
import {useBandService, usePersonalService} from "../services";
import {BandContext} from "../contexts";
import {NoBand} from "./NoBand";
import {BandSelector} from "./BandSelector";

export const BandSelection = () => {

    const [user] = usePersonalService();
    const [bands] = useBandService(user);
    const [currentBand, selectBand] = useContext(BandContext);

    if (bands) {
        return <div style={{marginTop: "10px"}}>
            {!currentBand &&
            <div>
                {bands.length > 0 ?
                    <BandSelector me={user!!} selectBand={selectBand} bands={bands}  />
                    :
                    <NoBand/>
                }
            </div>}
        </div>
    } else {
        return <div><p>loading...</p></div>
    }
}
