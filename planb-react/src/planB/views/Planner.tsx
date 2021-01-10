import React, {useState} from "react";
import {BandSelection, BandSpace, Header} from "../components";
import {Link} from "react-router-dom";
import {BandContext} from "../contexts";

import {Band} from "../resources";


export const Planner = () => {
    const [selectedBand, setSelectedBand] = useState<Band>();


    return <div className={"Planner"}>
        <BandContext.Provider value={[selectedBand, (band) => {setSelectedBand(band)}]}>
            <Header/>
            <div style={{color: "#dddddd", textAlign: "center", marginTop: "20px"}}>
                {selectedBand ? <BandSpace/> : <BandSelection/> }
            </div>
        </BandContext.Provider>
    </div>
}
