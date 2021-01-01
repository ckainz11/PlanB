import React, {useState} from "react";
import {Button, Container, Icon} from "semantic-ui-react";
import {Song} from "../resources";

const getCSS = (rating: number) => {
    let css = "song-score";
    if(rating <= 5)
        css += " color-negative";
    else
        css += " color-positive";
    return css
};

export const SongDisplay = ({song}: SongDisplayProps) => {

    const [details, setDetails] = useState(false)


    return <Container inverted basic className={"song-display"}>
        <div className={"song-display-header"}>
            <p className={getCSS(song.rating)} >{song.rating}</p>
            <h3 className={"song-title"}>Cool</h3>
            <Button circular icon={details ? "arrow up" : "arrow down"} basic inverted onClick={() => setDetails(!details)} />
        </div>
      {details && <div className={"song-details"} >
            <a href="login">Link</a>
        </div>}


    </Container>


};
type SongDisplayProps = {
    song: Song
}