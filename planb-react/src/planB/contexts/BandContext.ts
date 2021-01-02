import {createContext} from "react";
import {Band} from "../resources";

type bandContextType = [Band | undefined, (newBand: Band | undefined) => any];

export const BandContext= createContext([undefined, () => {}] as bandContextType);
