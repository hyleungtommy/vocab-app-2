import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import * as AxiosHelper from '@/helpers/AxiosHelper';
import { TagsModalProps } from "@/models/props/TagsModelProps";

const TagFilterModal = (props: TagsModalProps) => {
    const [tempList, setTempList] = useState<string[]>(props.tags)
    const [checkboxList, setCheckboxList] = useState<boolean[]>([])

    const handleOnChange = (i : number)=>{
        const localCheckboxList = [...checkboxList]
        localCheckboxList[i] = !localCheckboxList[i]
        setCheckboxList(localCheckboxList)
    }

    const loadTags = () => {
        setTempList(props.tags)
        setCheckboxList(new Array(props.tags.length).fill(false))
    }

    const selectAllTags = ()=>{
        const localCheckboxList = new Array(checkboxList.length).fill(true)
        setCheckboxList(localCheckboxList)
    }

    return (
        <Modal
            show={props.show}
            onHide={() => {
                let checkedTags: string[] = []
                let idx = 0
                for(let checkbox of checkboxList){
                    if(checkbox){
                        checkedTags.push(tempList[idx])
                    }
                    idx ++
                }
                props.closeTagModal(checkedTags)
            }
            }
            onEntered={() => loadTags()}>
            <Modal.Header>Only show these tags : </Modal.Header>
            <Modal.Body>
                
                {
                    checkboxList.map((checkbox,idx)=>(
                        <p>
                        <input
                            type="checkbox"
                            checked={checkbox}
                            onChange={() => handleOnChange(idx)}
                        />
                        &nbsp;
                        {tempList[idx]}
                        </p>
                    ))
                }
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-primary blue"
                    onClick={selectAllTags}
                >
                    Select All
                </button>
            </Modal.Footer>
        </Modal>
    )


};

export default TagFilterModal
