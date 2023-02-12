import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FilterButtonProps } from '@/models/props/FilterButtonProps';
export const FilterButton = (props: FilterButtonProps) => {
    return (
        <DropdownButton id="filter-dropdown" title="Filter" className="dropdown dropstart text-end display-inline float-right">
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.onClickItem("V")}>Verb</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.onClickItem("ADJ")}>Adjective</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.onClickItem("N")}>Noun</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.onClickItem("ADV")}>Adverb</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.onClickItem("P")}>Pharse</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={()=>props.onClickItem("")}>All</Dropdown.Item>
        </DropdownButton>
    );
}