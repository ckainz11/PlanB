import React, {useCallback, useContext} from "react";
import {useBandService, usePersonalService} from "../../services";
import {Dropdown, Container, Menu, FormField, Select, DropdownItemProps, DropdownProps} from "semantic-ui-react";
import {BandContext} from "../contexts";


import logo from "../../images/LogoPlanB.png"



export const Header = () => {

    const [me] = usePersonalService();

    const [bands] = useBandService(me);

    const [selectedBand, setSelectedBand] = useContext(BandContext);

    const handleChange = useCallback(function (e, {value}) {
        setSelectedBand?.(bands?.find(band => {
            return value === band.dataBaseID}))
    }, [setSelectedBand, bands]);
    return (
        <div className="header">
            <div className={"headerItem left"}>
                <img className={"logo"} src={logo} alt={"logo"}/>
            </div>
            <div className={"headerItem push right"}>
                <div className={"dropdownWrapper"}>
                    <Dropdown
                        className={"selectBand"}
                        loading={bands ? bands.length === 0 : true}
                        disabled={bands ? bands.length === 0 : true}
                        direction={"left"}
                        onChange={handleChange}
                        placeholder={"select band"}
                        options={bands?.map((band) => {
                            return {key: band.dataBaseID, value: band.dataBaseID, text: band.dataBaseID}
                        }) || []}
                    />
                </div>
            </div>
            <div className={"headerItem right"}>
                <div className={"userIcon"}/>
            </div>

        </div>
    )
}
