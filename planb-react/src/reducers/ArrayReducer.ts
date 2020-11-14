import {DataBaseElement} from "../resources";


export enum ArrayAction {
    add,
    change,
    remove,
    clear,
    undefine,
}

export function ArrayReducer<T extends DataBaseElement>(state: undefined | T[], action: { type: ArrayAction.add | ArrayAction.change | ArrayAction.remove; payload: T} | {type: ArrayAction.clear | ArrayAction.undefine}): undefined | T[] {
    switch (action.type) {
        case ArrayAction.add:
            return state ? action.payload && [...state, action.payload] : [action.payload];
        case ArrayAction.change:
            return state && [...state.filter((e) => action.payload?.dataBaseID && e.dataBaseID !== action.payload.dataBaseID), action.payload];
        case ArrayAction.remove:
            return state && [...state.filter((e) => action.payload?.dataBaseID && e.dataBaseID !== action.payload.dataBaseID)];
        case ArrayAction.clear:
            return [];
        case ArrayAction.undefine:
            return undefined;
        default:
            throw new Error("Invalid action");
    }
}
