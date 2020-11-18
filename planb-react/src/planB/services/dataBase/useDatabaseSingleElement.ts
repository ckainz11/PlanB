import {useDatabase} from "./useDatabase";
import {useEffect, useState} from "react";
import {DataBaseElement} from "../../resources";

export function useDatabaseSingleElement<T extends DataBaseElement>(pathToElement: string): [T | undefined] {
    const [databaseValue] = useDatabase(pathToElement);
    const [element, setElement] = useState<T>();

    useEffect(() => {
        if (databaseValue) {
            setElement({dataBaseID: databaseValue.key, ...databaseValue.val()})
        }
    }, [databaseValue]);

    return [element];
}
