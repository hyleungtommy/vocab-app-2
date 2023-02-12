import { Languages } from "../language"

export type LangDropdownProps = {
    userId:string,
    langList:Languages[],
    selectedLang:number,
    
}