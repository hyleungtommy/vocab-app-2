import { Vocab } from "../vocab"

export type VocabModalProps = {
    show:boolean,
    handleClose:Function,
    modalMode:string,
    vocab:Vocab | undefined,
    langCode:string,
    userId:string
}