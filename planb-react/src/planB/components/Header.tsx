import React from "react";
import {useBandService} from "../../services";
import {Dropdown, Container, Menu, FormField, Select, DropdownItemProps} from "semantic-ui-react";

import logo from "../../images/LogoPlanB.png"

export const Header = () => {

    const [bands] = useBandService({dataBaseID: "ChristophID"});

    return (
        <div className="header">
            <div className={"headerItem left"}>
                <img className={"logo"} src={logo} alt={"logo"}/>
            </div>
            <div className={"headerItem push right"}>
                <div className={"dropdownWrapper"}>
                    <Dropdown
                        className={"selectBand"}
                        loading={bands ? bands.length == 0 : true}
                        disabled={bands ? bands.length == 0 : true}
                        direction={"left"}
                        selection
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
