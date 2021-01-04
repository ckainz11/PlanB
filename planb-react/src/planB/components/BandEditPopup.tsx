import React, {useContext, useState} from "react";
import {Button, Container, Divider, Dropdown, Form, Modal} from "semantic-ui-react";
import {Band, User} from "../resources";
import {MemberDisplay} from "./MemberDisplay";
import {useBandService, useMemberService, useUserService} from "../services";

export const BandEditPopup = ({open, band, close, me, selectBand, leader}: BandEditPopupProps) => {

    const [memberList, setMemberList] = useState<string[]>([])
    const [members, memberOperation] = useMemberService(band)
    const [bands, bandOperation] = useBandService(me)
    const [users] = useUserService()



    const options = users?.filter(user => user.dataBaseID !== me.dataBaseID).map(user => {
        return {
            key: user.dataBaseID,
            text: user.userName,
            value: user.dataBaseID,
            image: {avatar: true, src: user.photoUrl}
        }
    })


    return <Modal open={open} onClose={() => close()}>
        <Modal.Header className={"edit-header"}>Edit Band: {band?.name}</Modal.Header>
        <Modal.Content className={"edit-content"}>
            <MemberDisplay me={me} band={band}/>
            {leader && <Form>
               <Form.Group>
                   <Form.Field width={12}>
                       <Dropdown className={"edit-dropdown"} placeholder={"Members"} selection multiple fluid search pointing={"bottom"} options={options}
                                 onChange={((event, data) => {
                                     const newMemberList: string[] = []
                                     const m = data.value as []
                                     m.forEach(userid => {
                                         newMemberList.push(userid)
                                     })
                                     setMemberList(newMemberList)
                                 })}>
                       </Dropdown>
                   </Form.Field>
                   <Form.Field width={3}>
                       <Button className={"edit-add-btn"} content={"Add"} icon={"plus"} onClick={() => {
                           memberList.forEach(id => {
                               memberOperation({type: "add", payload: {dataBaseID: id} as User})
                           })
                       }}/>
                   </Form.Field>
               </Form.Group>
            </Form>}
            <Divider/>
            <div className={"edit-band-controls"}>
                {leader ? <Button content={"Delete Band"} icon={"trash"} className={"color-negative"} onClick={() => {
                    bandOperation({type: "remove", payload: band});
                    close();
                    selectBand(undefined)
                }}/> : <Button content="Leave Band" icon="log out" className={"color-negative"} onClick={() => {
                    memberOperation({type: "remove", payload: me});
                    close();
                    selectBand(undefined)
                }}/>}
                <Button content={"Done"} icon={"check"} className={"color-positive"} onClick={() => close()}/>
            </div>


        </Modal.Content>
    </Modal>


}
type BandEditPopupProps = {
    open: boolean
    close: () => void
    band: Band
    me: User
    selectBand: (b: Band | undefined) => void
    leader: boolean

}