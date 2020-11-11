import React, {useState} from "react";
import {useBandService, useMeetingService} from "../../services";
import {Band} from "../../resources/Band";

export function ServiceDebug() {
    const {bands} = useBandService();
    const [selectedBand, setSelectedBand] = useState<Band>();
    const {meetings} = useMeetingService(selectedBand);

    return <div>
        <h1>Debug:</h1>
        <h2>Bands:</h2>
        <pre>
            {JSON.stringify(bands, null, 2)}
        </pre>
        <div style={{backgroundColor: "lightgray"}}>
            <form>
                {
                    bands?.map((band) => {
                        return <div key={band.name}><label htmlFor={band.name}>{band.name}</label>
                            <input onChange={() => setSelectedBand(() => band)} type="radio" id={band.name} name="band" value={band.name}/><br/></div>
                    })
                }
            </form>
            <h4>Meetings</h4>
            <pre>
                {JSON.stringify(meetings, null, 2)}
            </pre>
        </div>
    </div>
}
