import 'bootstrap/dist/css/bootstrap.min.css';
import { VocabCardProps } from '@/models/props/VocabCardProps';

const VocabCard = (props:VocabCardProps)=>{

    let tagSpans: JSX.Element [] = []
    if(props.vocab.tags){
        for(let tag of props.vocab.tags){
            tagSpans.push(<span className='tag'>{tag}</span>)
        }
    }
    return(
        <div className="vocab-card" onClick={()=>props.handleShow(props.vocab)}>
            <p>
                {props.vocab.vocab}<span className="badge bg-secondary">{props.vocab.type}</span>
                {tagSpans}
            </p>
            <p>{props.vocab.meaning}</p>
            {props.vocab.sentence &&
                <p className="senetence">{props.vocab.sentence}</p>
            }
            {props.vocab.translation &&
                <p className="senetence">{props.vocab.translation}</p>
            }
      </div>
    );
}

export default VocabCard;