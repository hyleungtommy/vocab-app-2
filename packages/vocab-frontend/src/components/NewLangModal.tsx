import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import LangModalItem from "./NewLangModalItem";
import { NewLangModalProps } from "@/models/props/NewLangModalProps";
import * as AxiosHelper from '@/helpers/AxiosHelper';

const LangModal = (props: NewLangModalProps) => {
  const [newLangList, setNewLangList] = useState<JSX.Element[]>([])

  const getAvailableLangList = async () => {
    const _newLangList = await AxiosHelper.getAvailableLangList(props.userId);
    console.log(_newLangList)
    const modalItemList: JSX.Element[] = [];
    if (_newLangList) {
      for (let lang of _newLangList) {
        modalItemList.push(<LangModalItem lang={lang} addNewLang={addNewLang} />)
      }
      setNewLangList(modalItemList);
    }
  };

  const addNewLang = (code: string) => {
    AxiosHelper.addNewLang(props.userId, code)
      .then(() => {
        props.closeLangModal()
        props.setUpdateView(props.updateView + 1)
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.closeLangModal()}
      onEntered={() => getAvailableLangList()}>
      <Modal.Header>Add a new language</Modal.Header>
      <Modal.Body>
        {newLangList}
      </Modal.Body>
    </Modal>
  )


};

export default LangModal
