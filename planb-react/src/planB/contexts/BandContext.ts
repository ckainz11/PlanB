import React, {createContext} from "react";
import {Band} from "../../resources";

function value () {
    let band: Band | undefined = undefined;
    const setBand = (newBand: Band | undefined) => {
        band = newBand;
    };

    return [band, setBand];
}

export const BandContext= createContext(value());
