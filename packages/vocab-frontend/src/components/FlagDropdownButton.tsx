import { Languages } from "@/models/language";
import { FlagDropDownButtonProps } from "@/models/props/FlagDropDownButtonProps";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FlagDropdownItem } from "./FlagDropdownItem";
import Dropdown from 'react-bootstrap/Dropdown';

export const FlagDropDownButton = (props: FlagDropDownButtonProps) => {
    const dropdownItems: JSX.Element[] = [];
    if (props.langList.length > 0) {
        let i = 0;
        props.langList.map((lang: Languages) => {
            dropdownItems.push(
                <FlagDropdownItem
                    flagCode={lang.code}
                    handleClick={props.handleClick}
                    pos={i}
                    langName={lang.name}
                />
            );
            i++;
        })
    }
    return (
        <DropdownButton title="Select Languages" className="dropdown dropstart text-end display-inline float-right">
            {dropdownItems}
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.openLangModal()}>Add New</Dropdown.Item>
        </DropdownButton>
    );
}