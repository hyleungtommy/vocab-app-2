import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import * as AxiosHelper from '../helpers/AxiosHelper'
import { Vocab } from "@/models/vocab";
import { VocabModalProps } from "@/models/props/VocabModalProps";

const VocabModal = (props:VocabModalProps) => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const loadVocabData = () => {
    if (props.vocab && props.modalMode == "Exist") {
      setId(props.vocab._id);
      setName(props.vocab.vocab);
      setType(props.vocab.type);
      setMeaning(props.vocab.meaning);
      setComment(props.vocab.sentence);
      setTranslation(props.vocab.translation);
      setNotes(props.vocab.note);
      setErrorMsg("")
    } else {
      setName("");
      setType("N");
      setMeaning("");
      setComment("");
      setTranslation("");
      setNotes("");
      setErrorMsg("")
    }
  };
  const addNewVocab = (langCode:string, userId:string) => {
    const vocab:Vocab = {
      vocab: name,
            type: type,
            meaning: meaning,
            sentence: comment,
            translation: translation,
            note: notes,
            langCode: langCode,
            correctAnswerCount:0,
            createdAt:"",
            updatedAt:"",
            userId:userId,
            _id:""
    }
    AxiosHelper.addNewVocab(vocab).then(() => {
      props.handleClose();
    });
  };

  const updateVocab = () => {
    const vocab:Vocab = {
      vocab: name,
            type: type,
            meaning: meaning,
            sentence: comment,
            translation: translation,
            note: notes,
            langCode: "",
            correctAnswerCount:0,
            createdAt:"",
            updatedAt:"",
            userId:"",
            _id:id
    }
    AxiosHelper.updateVocab(vocab).then(() => {
      props.handleClose();
    });
  };

  const deleteVocab = (e:any) => {
    AxiosHelper.deleteVocab(id).then(() => {
      props.handleClose();
    });
  };

  const validateInputForAddNew = (langCode:any, userId:any) => {
    if(name == "" || meaning == ""){
      setErrorMsg("Vocab and meaning cannot be empty");
    }else{
      setErrorMsg("")
      addNewVocab(langCode, userId)
    }
  }

  const validateInputForUpdate = ()=>{
    if(name == "" || meaning == ""){
      setErrorMsg("Vocab and meaning cannot be empty");
    }else{
      setErrorMsg("")
      updateVocab()
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={()=>props.handleClose()}
      onEntered={loadVocabData}
    >
      <Modal.Body>
        <Form>
          <label className="form-label">Vocab:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter vocab"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="form-label">Type:</label>
          <select
            name="cars"
            id="cars"
            value={type}
            className="vocab-dropdown"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="N">Noun</option>
            <option value="V">Verb</option>
            <option value="ADJ">Adjective</option>
            <option value="ADV">Adverb</option>
            <option value="P">Phrase</option>
          </select>
          <label className="form-label">Meaning:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter vocab"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
          <label className="form-label">Sentences:</label>
          <textarea
            className="form-control"
            rows={2}
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <label className="form-label">Sentence Translation:</label>
          <textarea
            className="form-control"
            rows={2}
            id="translation"
            name="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          ></textarea>
          <label className="form-label">Notes:</label>
          <textarea
            className="form-control"
            rows={2}
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          <p>{errorMsg}</p>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {
          props.modalMode == "New" ? (
            <></>
            ) : (<Button
              className="vocab-delete me-auto"
              variant="outline-secondary"
              onClick={deleteVocab}
            >
              Delete
            </Button>)
        }
        <Button variant="secondary" onClick={()=>props.handleClose()}>
          Close
        </Button>
        {props.modalMode == "New" ? (
          <Button
            variant="primary"
            onClick={() => validateInputForAddNew(props.langCode, props.userId)}
          >
            Add Vocab
          </Button>
        ) : (
          <Button variant="primary" onClick={validateInputForUpdate}>
            Save Change
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default VocabModal;
