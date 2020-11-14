import {DataBaseElement} from "../resources";


export enum ArrayAction {
    add,
    change,
    remove,
    clear,
    undefine,
    move
}

export function ArrayReducer<T extends DataBaseElement>(state: undefined | T[], action: { type: ArrayAction.add | ArrayAction.change | ArrayAction.remove; payload: T; index?: number} | {type: ArrayAction.clear | ArrayAction.undefine} | {type: ArrayAction.move, payload: T, target: T | null}): undefined | T[] {
    switch (action.type) {
        case ArrayAction.add:
            if (state && action.index) {
                return [...state.slice(0, action.index), action.payload, ...state.slice(action.index)];
            }
            return state ? action.payload && [...state, action.payload] : [action.payload];
        case ArrayAction.change:
            if (state && action.index) {
                return [...state.slice(0, action.index), action.payload, ...state.slice(action.index + 1)];
            }
            return state && state.map((e) => {
                if (e.dataBaseID === action.payload.dataBaseID) {
                    return action.payload;
                }
                return e;
            });
        case ArrayAction.remove:
            if (state && action.index) {
                return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
            }
            return state && [...state.filter((e) => action.payload?.dataBaseID && e.dataBaseID !== action.payload.dataBaseID)];
        case ArrayAction.move:
            if (state && action.target === null) {
                return [action.payload, ...state.filter((e) => action.payload?.dataBaseID && e.dataBaseID !== action.payload.dataBaseID)]
            } else if (state) {
                const newState = [];
                for (let element of state) {
                    if (element.dataBaseID === action.target?.dataBaseID) {
                        newState.push(action.target, action.payload);
                    } else if (element.dataBaseID !== action.payload.dataBaseID) {
                        newState.push(element);
                    }
                }
            }
            return;
        case ArrayAction.clear:
            return [];
        case ArrayAction.undefine:
            return undefined;
        default:
            throw new Error("Invalid action");
    }
}
