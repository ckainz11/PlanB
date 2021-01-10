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
          <div className={"song-display-score-vote"}>
              <Button size={"mini"} disabled={song.rating === 10} className={"color-positive song-btn"} icon="plus" onClick={() => songOperation({type: "update", payload: {...song, rating: song.rating + 1}})} />
              <Button size={"mini"} disabled={song.rating === 0} className={"color-negative song-btn"} icon="minus" onClick={() => songOperation({type: "update", payload: {...song, rating: song.rating - 1}})} />
          </div>
            <p>{song.content}</p>
          <Button size={"mini"} className={"color-negative song-btn"} icon="trash" onClick={() => songOperation({type: "remove", payload: song})} />
        </div>}


    </Container>


};
type SongDisplayProps = {
    song: Song
    band: Band
}