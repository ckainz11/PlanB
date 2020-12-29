import React, {useContext, useState} from "react";
import {Button, Container, Dropdown, Modal} from "semantic-ui-react";
import {Band, User} from "../resources";
import {MemberDisplay} from "./MemberDisplay";
import {useMemberService, useUserService} from "../services";

export const BandEditPopup = ({open, band,onClose, me}: BandEditPopupProps) => {

    const [memberList, setMemberList] = useState<string[]>([])
    const [members, memberOperation] = useMemberService(band)
    const [users] = useUserService()
    const options = users?.filter(user => user.dataBaseID != me.dataBaseID).map(user => {
        return  {key: user.dataBaseID, text: user.userName, value: user.dataBaseID, image: {avatar: true, src: user.photoUrl}}
    })


    return <Modal  open={open} onClose={() => onClose()}>
        <Modal.Header >Edit Band: {band?.name}</Modal.Header>
        <Modal.Content>
            <MemberDisplay me={me} band={band}/>
            <Dropdown placeholder={"Members"} selection multiple fluid search pointing={"bottom"} options={options} onChange={((event, data) => {
                const newMemberList: string[] = []
                const m = data.value as []
                m.forEach(userid => {newMemberList.push(userid)})
                setMemberList(newMemberList)
            })}>
            </Dropdown>
            <Button content={"Add"} icon={"plus"} onClick={() => {
                memberList.forEach(id => {
                    memberOperation({type: "add", payload: {dataBaseID: id} as User})
                })
            }}/>


        </Modal.Content>
    </Modal>




}
type BandEditPopupProps = {
    open: boolean
    onClose: () => void
    band: Band
    me: User
}