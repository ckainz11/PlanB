import {DataBaseElement} from "../../resources";
import {useDatabase} from "./useDatabase";
import {useEffect, useState} from "react";

export function useDatabaseElements<T extends DataBaseElement>(pathToElement : string | undefined): (T[] | undefined)[] {
    const [databaseValue] = useDatabase(pathToElement);
    const [elements, setElements] = useState<T[]>();

    useEffect(() => {
        if (databaseValue?.val()) {
            setElements(Object.keys(databaseValue?.val()).map(key => {
                return {dataBaseID: key, ...databaseValue?.val()[key]}
            }));
        } else {
            setElements(undefined);
        }
    }, [databaseValue]);

    return [elements];
}
