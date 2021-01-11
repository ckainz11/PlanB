import React, {useContext, useState} from "react";
import {Button, Container} from "semantic-ui-react";
import {BandContext} from "../contexts";
import {useSongService} from "../services";
import {SongDisplay} from "./SongDisplay";
import {SongCreatePopup} from "./SongCreatePopup";
import {Band} from "../resources";


export const SongPortfolio = () => {


    const [band] = useContext(BandContext)
    const [open, setOpen] = useState(false)
    const [songs] = useSongService(band)

    const close = () => setOpen(false)

    return <Container className={"portfolio"}>
        <h1 className={"portfolio-header"}>Song Portfolio</h1>
        {songs?.length === 0 && <h3>Looks like your portfolio is empty</h3>}
        <Button content={"Add Song"} icon={"plus"} className={"color-positive add-song-btn"} onClick={() => setOpen(true)}/>
        <div className={"songs-div"}>{songs?.sort((a,b) => a.rating - b.rating).map(song => {
            return <SongDisplay key={song.dataBaseID} band={band as Band} song={song}/>
        })}
        {open && <SongCreatePopup open={open} close={close} />}
        </div>
    </Container>


}
