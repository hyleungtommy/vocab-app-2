import flagCh from '../images/flag-ch.png';
import flagJp from '../images/flag-jp.png';
import flagEs from '../images/flag-es.png';
import flagKr from '../images/flag-kr.jpg';
import flagRu from '../images/flag-ru.png';
import { StaticImageData } from 'next/image';

export const Flags:{ [name: string]: StaticImageData } = {
    "ch":flagCh,
    "jp":flagJp,
    "es":flagEs,
    "kr":flagKr,
    "ru":flagRu
}