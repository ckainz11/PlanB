import React from "react";
import {Table} from "semantic-ui-react";
import {Song} from "../resources";

export const SongTable = ({songs}: SongTableProps) => {



    return <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Song</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Reference</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {songs.map(s => {
                return <Table.Row key={s.dataBaseID}>
                    <Table.Cell>{s.name}</Table.Cell>
                    <Table.Cell>{s.rating}</Table.Cell>
                    <Table.Cell>{s.content}</Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>

}
type SongTableProps = {
    songs: Song[]
}