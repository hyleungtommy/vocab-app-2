import { Languages } from "../language"

export type FlagDropDownButtonProps = {
    langList : Languages[],
    selectedLangPos:number,
    handleClick:Function,
    openLangModal:Function
}