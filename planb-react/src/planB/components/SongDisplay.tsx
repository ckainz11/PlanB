import React, {useState} from "react";
import {Button, Container, Icon} from "semantic-ui-react";
import {Band, Song} from "../resources";
import {useSongService} from "../services";

const getCSS = (rating: number) => {
    let css = "song-score";
    if(rating <= 5)
        css += " color-negative";
    else
        css += " color-positive";
    return css
};

export const SongDisplay = ({song, band}: SongDisplayProps) => {

    const [details, setDetails] = useState(false)
    const [songs, songOperation] = useSongService(band)

    return <Container className={"song-display"}>
        <div className={"song-display-header"}>
            <p className={getCSS(song.rating)} >{song.rating}</p>
            <h3 className={"song-title"}>{song.name}</h3>
            <Button circular  icon={details ? "arrow up" : "arrow down"} basic inverted onClick={() => setDetails(!details)} />
        </div>
      {details && <div className={"song-details"} >
            <p>{song.content}</p>
          <Button size={"mini"} className={"color-negative"} icon="trash" onClick={() => songOperation({type: "remove", payload: song})} />
        </div>}


    </Container>


};
type SongDisplayProps = {
    song: Song
    band: Band
}