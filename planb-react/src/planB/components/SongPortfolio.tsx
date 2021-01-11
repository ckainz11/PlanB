import React, {useContext, useState} from "react";
import {Button, Container, Dropdown} from "semantic-ui-react";
import {BandContext} from "../contexts";
import {useSongService} from "../services";
import {SongDisplay} from "./SongDisplay";
import {SongCreatePopup} from "./SongCreatePopup";
import {Band} from "../resources";


export const SongPortfolio = () => {
    const [band] = useContext(BandContext)
    const [open, setOpen] = useState(false)
    const [songs] = useSongService(band)
    const [sortBy, setSortBy] = useState<"none"|"highest"|"lowest"|"name">("none")

    const close = () => setOpen(false)

    return <Container className={"portfolio"}>
        <div className={"portfolio-header"}>
            <div className={"portfolio-header-left"}/>
            <h1 className={"portfolio-header-center"}>Songs</h1>
            <div>
                <Dropdown className={"portfolio-header-right"}  icon={"sort"} text={"sort"}>
                    <Dropdown.Menu>
                        <Dropdown.Item active={sortBy==="none"} onClick={() => setSortBy("none")}>Default</Dropdown.Item>
                        <Dropdown.Item active={sortBy==="highest"} onClick={() => setSortBy("highest")}>Highest</Dropdown.Item>
                        <Dropdown.Item active={sortBy==="lowest"} onClick={() => setSortBy("lowest")}>Lowest</Dropdown.Item>
                        <Dropdown.Item active={sortBy==="name"} onClick={() => setSortBy("name")}>Name</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
        {songs?.length === 0 && <h3>Looks like your portfolio is empty</h3>}
        <Button content={"Add Song"} icon={"plus"} className={"color-positive add-song-btn"} onClick={() => setOpen(true)}/>
        <div className={"songs-div"}>{songs?.sort((a,b) => {
            switch (sortBy) {
                case "lowest":
                    return a.rating - b.rating
                case "highest":
                    return b.rating - a.rating
                case "name":
                    return ('' + a.name).localeCompare(b.name)
            }
            return 0
        }).map(song => {
            return <SongDisplay key={song.dataBaseID} band={band as Band} song={song}/>
        })}
        {open && <SongCreatePopup open={open} close={close} />}
        </div>
    </Container>


}
