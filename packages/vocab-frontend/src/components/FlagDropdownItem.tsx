import { FlagDropdownItemProps } from "@/models/props/FlagDropdownItemProps";
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'next/image'
import { Flags } from "@/models/flags";

export const FlagDropdownItem = (props: FlagDropdownItemProps) => {
    return (
        <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.handleClick(props.pos)}>
            <Image
                src={Flags[props.flagCode]}
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                width={70}
                height={45}
                alt="flag"
            />
            {props.langName}
        </Dropdown.Item>
    )
}