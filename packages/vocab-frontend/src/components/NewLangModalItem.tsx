import "bootstrap/dist/css/bootstrap.min.css";
import { Flags } from "@/models/flags";
import Image from "next/image";
import { NewLangModalItemProps } from "@/models/props/NewLangModaIItemProps";

const LangModalItem = (props:NewLangModalItemProps)=>{
    return(
        <a
        className="dropdown-item"
        href="#"
        onClick={()=>props.addNewLang(props.lang.code)}
        >
            <Image className="flags" src={Flags[props.lang.code]} alt="flag" width={200} height={50}/>
            <p>{props.lang.name}</p>
        </a>
    )
}

export default LangModalItem