import React, {useCallback, useContext, useState} from "react";
import {Button, Dropdown, Form, FormField, FormGroup, Input, Modal, TextArea} from "semantic-ui-react";
import {Band, Song, User} from "../resources";
import {useBandService, useMemberService, usePersonalService, useUserService} from "../services";
import {BandContext} from "../contexts";


export const BandCreatePopup = ({open, onClose, selectBand, me}: BandCreatePopupProps) => {
    const [newBand, setNewBand] = useState<Band>({leader: me ? me.dataBaseID : ""} as Band)
    const [users] = useUserService()
    const [memberList, setMemberList] = useState<User[]>([])
    const [bands, bandOperation] = useBandService(me)


    const pushBand = useCallback(async () => {
        await bandOperation({
            type: "addWithMembers", payload: {
                band: newBand,
                members: memberList as User[]
            }
        })
        onClose()
        selectBand(newBand)
    }, [bandOperation, memberList, selectBand, newBand]);




    const options = users?.filter(user => user.dataBaseID !== me?.dataBaseID).map(user => {
        return {
            key: user.dataBaseID,
            text: user.userName,
            value: user.dataBaseID,
            image: {avatar: true, src: user.photoUrl}
        }
    })



    return <Modal open={open} onClose={() => onClose()} closeIcon>
        <Modal.Header>Create a new Band</Modal.Header>
        <Modal.Content>
            <Form>
                <FormField required>
                    <Input placeholder={"Band name"}
                           onChange={(event, data) => setNewBand({...newBand, name: data.value})}/>
                </FormField>
                <FormField>
                    <TextArea placeholder={"Description"}
                              onChange={(event, data) => setNewBand({...newBand, description: data.value as string})}/>
                </FormField>
                <FormField>
                    <Dropdown placeholder={"Members"} selection multiple fluid search pointing={"bottom"}
                              options={options} onChange={((event, data) => {
                        const newMemberList: string[] = []
                        const m = data.value as []
                        m.forEach(userid => {
                            newMemberList.push(userid)
                        })
                        setMemberList(newMemberList.map((e) => {
                            return {dataBaseID: e} as User
                        }))
                    })}>
                    </Dropdown>
                </FormField>

                <Button icon={"check"}  className={"color-positive"} content={"Create!"} floated={"right"} onClick={() => pushBand()}/>
            </Form>
        </Modal.Content>


    </Modal>
}

type BandCreatePopupProps = {
    open: boolean
    onClose: () => void
    selectBand: (b: Band) => void
    me: User
}