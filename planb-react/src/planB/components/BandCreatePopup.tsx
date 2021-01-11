import React, {useCallback, useContext, useState} from "react";
import {
    Button,
    Divider,
    Dropdown,
    Form,
    FormField,
    FormGroup,
    Input,
    Message,
    Modal,
    TextArea
} from "semantic-ui-react";
import {Band, CustomError, Song, User} from "../resources";
import {useBandService, useMemberService, usePersonalService, useUserService} from "../services";
import {BandContext} from "../contexts";
import {CustomErrorComponent} from "./CustomErrorComponent";

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getOptions(users: User[], me: User) {
    const options = users?.filter(user => user.dataBaseID !== me?.dataBaseID).map(user => {
        return {
            key: user.dataBaseID,
            text: user.userName,
            value: user.dataBaseID,
            image: {avatar: true, src: user.photoUrl}
        }
    })
    return options;
}

export const BandCreatePopup = ({open, onClose, selectBand, me}: BandCreatePopupProps) => {
    const [newBand, setNewBand] = useState<Band>({leader: me ? me.dataBaseID : "", description: ""} as Band)
    const [users] = useUserService()
    const [memberList, setMemberList] = useState<User[]>([])
    const [bands, bandOperation, validateBand] = useBandService(me)
    const [creating, setCreating] = useState(false)
    const [errors, setErrors] = useState<CustomError[]>([]);


    const containsError = (field: string) => {
        for (let e of errors) {
            if (e.field === field)
                return e
        }
        return undefined
    }
    const pushBand = useCallback(async () => {
        const errors = validateBand(newBand)
        if (errors.length === 0) {
            setCreating(true)
            await sleep(500)
            await bandOperation({
                type: "addWithMembers", payload: {
                    band: newBand,
                    members: memberList as User[]
                }
            })
            setCreating(false)
            onClose()
            selectBand(newBand)
        } else {
            setErrors(errors)
        }
    }, [bandOperation, memberList, selectBand, newBand, onClose]);

    return <Modal open={open} onClose={() => onClose()} closeIcon>
        <Modal.Header className="edit-header">Create a new Band</Modal.Header>
        <Modal.Content className="edit-content">
            <Form error>
                <FormField error={!!containsError("name")}>
                    <h3>Enter your band's name</h3>
                    <Input  className="dark-input" placeholder={"Band name"}
                           onChange={(event, data) => setNewBand({...newBand, name: data.value})}/>
                    <br/>
                    <br/>
                    <CustomErrorComponent customError={containsError("name")}/>
                </FormField>

                <FormField error={!!containsError("description")}>
                    <h3>Description</h3>
                    <TextArea  placeholder={"Description"}
                              onChange={(event, data) => setNewBand({...newBand, description: data.value as string})}/>
                    <label className="font-color-grey">{newBand.description.length}/500</label>

                    <CustomErrorComponent customError={containsError("description")}/>
                </FormField>
                <FormField>
                    <h3>Add some members</h3>
                    <p>You can always add or remove members later on</p>
                    <Dropdown className="dark-dropdown" placeholder={"Members"} selection fluid multiple search
                              pointing={"bottom"}
                              options={getOptions(users || [], me)} onChange={((event, data) => {
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
                <Divider/>

                <div className="create-band-controls">
                    <Button icon={"cancel"} loading={creating} className={"color-negative"} content={"Close"}
                            onClick={() => onClose()}/>
                    <Button icon={"check"} loading={creating} className={"color-positive"} content={"Create!"}
                            onClick={() => pushBand()}/>

                </div>


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