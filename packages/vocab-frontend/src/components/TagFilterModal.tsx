import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import * as AxiosHelper from '@/helpers/AxiosHelper';
import { TagsModalProps } from "@/models/props/TagsModelProps";

const TagFilterModal = (props: TagsModalProps) => {
    const [newLangList, setNewLangList] = useState<JSX.Element[]>([])
    const [newTag, setNewTag] = useState<string>("")
    const [updateView, setUpdteView] = useState<number>(0)
    const [tempList, setTempList] = useState<string[]>(props.tags)
    useEffect(() => {
        loadTags();
    }, [updateView])

    const loadTags = () => {
        const modalItemList: JSX.Element[] = [];
        var idx = 0;
        for (var item in tempList) {
            let i = idx
            modalItemList.push(
                <>
                    <p>
                        {tempList[idx]}
                        &nbsp;
                        <input type="checkbox"></input>
                    </p>
                   
                </>
            )
            idx++;
        }

        setNewLangList(modalItemList)
    }

    const addNewTag = () => {
        tempList.push(newTag)
        setNewTag("")
        setUpdteView(updateView + 1)
    }

    const removeTag = (idx: number) => {
        tempList.splice(idx, 1)
        setUpdteView(updateView + 1)
    }

    return (
        <Modal
            show={props.show}
            onHide={() => {
                props.closeTagModal()
            }
            }
            onEntered={() => loadTags()}>
            <Modal.Header>Only show these tags : </Modal.Header>
            <Modal.Body>
                {newLangList}

            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-primary blue"
                    onClick={() => {
                        if (newTag.length > 0)
                            addNewTag()
                    }
                    }
                >
                    Select All
                </button>
            </Modal.Footer>
        </Modal>
    )


};

export default TagFilterModal
