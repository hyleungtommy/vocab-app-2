import 'bootstrap/dist/css/bootstrap.min.css';
import { VocabCardProps } from '@/models/props/VocabCardProps';

const VocabCard = (props:VocabCardProps)=>{
    return(
        <div className="vocab-card" onClick={()=>props.handleShow(props.vocab)}>
            <p>{props.vocab.vocab}<span className="badge bg-secondary">{props.vocab.type}</span></p>
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