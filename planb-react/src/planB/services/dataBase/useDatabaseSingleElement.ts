import {useDatabase} from "./useDatabase";
import {useEffect, useState} from "react";
import {DataBaseElement} from "../../resources";

export function useDatabaseSingleElement<T extends DataBaseElement>(pathToElement: string | undefined): [T | undefined] {
    const [databaseValue] = useDatabase(pathToElement);
    const [element, setElement] = useState<T>();

    useEffect(() => {

        if (databaseValue) {
            setElement({dataBaseID: databaseValue.key, ...databaseValue.val()})
        } else {
            setElement(undefined);
        }
    }, [databaseValue]);

    return [element];
}
