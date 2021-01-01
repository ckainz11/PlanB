import React, {useContext} from "react";
import {Container} from "semantic-ui-react";
import {BandContext} from "../contexts";
import {useSongService} from "../services";
import {SongDisplay} from "./SongDisplay";


export const SongPortfolio = () => {


    const [band, selectBand] = useContext(BandContext)

    const [songs] = useSongService(band)


    return <Container basic inverted className={"portfolio"}>
        <h1 className={"portfolio-header"}>Song Portfolio</h1>
        {songs?.sort((a,b) => a.rating - b.rating).map(song => {
            return <SongDisplay song={song}/>
        })}
        {songs?.length === 0 && <h3>Looks like your portfolio is empty</h3>}
    </Container>


}