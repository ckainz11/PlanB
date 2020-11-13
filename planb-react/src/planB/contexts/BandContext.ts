import React, {createContext, useState} from "react";
import {Band} from "../../resources";

type bandContextType = [band: Band | undefined, setBand: (newBand: Band | undefined) => any];

export const BandContext= createContext([undefined, () => {}] as bandContextType);
