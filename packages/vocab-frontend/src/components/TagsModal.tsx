import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import * as AxiosHelper from '@/helpers/AxiosHelper';
import { TagsModalProps } from "@/models/props/TagsModelProps";

const TagModal = (props: TagsModalProps) => {
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
                    <button
                        type="button"
                        className="btn btn-primary blue display-inline"
                        onClick={(e) => removeTag(i)}
                    >
                        Remove
                    </button>
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
                AxiosHelper.replaceUserTagList(props.userId, tempList);
            }
            }
            onEntered={() => loadTags()}>
            <Modal.Header>Manage your tags</Modal.Header>
            <Modal.Body>
                {newLangList}

            </Modal.Body>
            <Modal.Footer>
                <input type="text" value={newTag}
                    onChange={(e) => {
                        setNewTag(e.target.value)
                    }
                    }>
                </input>
                <button
                    type="button"
                    className="btn btn-primary blue"
                    onClick={() => {
                        if (newTag.length > 0)
                            addNewTag()
                    }
                    }
                >
                    Add New Tag
                </button>
            </Modal.Footer>
        </Modal>
    )


};

export default TagModal
