import React, { useRef, useEffect, useState } from "react";
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import memberLogo from "../images/member4.jpg";
import VocabCard from "../components/VocabCard";
import VocabModal from "../components/VocabModal";
import LangModal from "../components/NewLangModal";
import Image from 'next/image'
import { FilterButton } from '../components/FilterButton';
import * as AxiosHelper from "@/helpers/AxiosHelper";
import { Vocab } from "@/models/vocab";
import { Languages } from "@/models/language";
import { FlagDropDownButton } from "@/components/FlagDropdownButton";
import  { useRouter } from "next/router";
import ProtectedPage from '../protectedPage'

const Vocab = (item: any) => {

  const quizButton = useRef(null)
  const [vocabs, setVocabs]= useState<Vocab[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [langModalShow, setLangModalShow] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>("New");
  const [selectedVocab, setSelectedVocab] = useState<Vocab>();
  const [userId, setUserId] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState<number>(0);
  const [selectedLangCode, setSelectedLangCode] = useState<string>("");
  const [selectedLangType, setSelectedLangType] = useState<string>("");
  const [langList, setLangList] = useState<Languages[]>([]);
  const [updateView, setUpdateView] = useState<number>(0);
  const [updateLangView, setUpdateLangView] = useState<number>(0);
  const router = useRouter();

  const handleClose = () => {
    setShow(false);
    setUpdateView(updateView + 1);
  };
  const openModalAsNewVocab = () => {
    setShow(true);
    setModalMode("New");
  };
  const openModalAsExistingVocab = (selectedVocab: Vocab) => {
    setShow(true);
    setModalMode("Exist");
    setSelectedVocab(selectedVocab);
  };
  const selectLanguage = (pos: number) => {
    setSelectedLang(pos);
    setSelectedLangCode(langList[pos].code);
    storeUserInfo(userId, langList[pos].code)
    setUpdateView(updateView + 1);
  };

  const getVocabList = async function (type:string) {
    if(langList.length > 0 && userId !== ""){
      const vocabList: Vocab[] = await AxiosHelper.getVocabListByType(userId,selectedLangCode,type);
      setVocabs(vocabList);
      setSelectedLangType(type);
      if (vocabList.length > 20) {
        //quizButton.current.style="display:inline-block"
      } else {
        //quizButton.current.style="display:none"
      }
    }
  };

  const getLangList = async function () {
    //quizButton.current.style="display:none"// do not show quest button when langList is empty
    let _userId = userId;
    if(_userId == ""){
      _userId = localStorage.getItem("userId") || "";
      console.log("_userId" + _userId)
    }
    if(_userId !== ""){
      const _langList:Languages[] = await AxiosHelper.getLangList(_userId);
      console.log(_langList)
    setLangList(_langList);
    
    if (_langList.length > 0) {
      setSelectedLangCode(_langList[0].code)
      //storeUserInfo(userId, _langList[0].code)
      if(langList.length == 0){// on first load
        const vocabList = await AxiosHelper.getVocabListByType(_userId,_langList[0].code,"");
        console.log(vocabList)
        setVocabs(vocabList);
      }
    }
    }
    
  };

  const storeUserInfo = (userId: string, selectedLang: string) => {
    localStorage.setItem("userId", userId)
    localStorage.setItem("selectedLang", selectedLang)
  }

  const openLangModal = () => {
    setLangModalShow(true);
  }

  const closeLangModal = () => {
    setLangModalShow(false);
  }

  const logout = ()=>{
    localStorage.clear();
    router.push("login");
  }

  useEffect(() => {
    getVocabList("");
  }, [updateView]);
  
  
  useEffect(() => {
    getLangList();
  }, [updateLangView]);

  useEffect(()=>{
    setUserId(localStorage.getItem("userId") || "")
  })
  
  //store all display vocab cards
  //todo: update number of card when user scroll down
  var cards: JSX.Element[] = [];
  vocabs.map((vocab: Vocab) => {
    cards.push(
      <VocabCard
        vocab={vocab}
        handleShow={openModalAsExistingVocab}
      />
    );
  });
  //console.log(langList)
  return (
    <>
      <ProtectedPage>
      <Container fluid>
        <Container id="navbar">
          <Image src={memberLogo} className="account-icon" alt="acc" width={200} height={200} />
          <Button variant="outline-success" className="btn-logout" onClick={()=>logout()} >Logout</Button>
          <Button id="btn-quiz" ref={quizButton} variant="info" >Quiz</Button>
          {
            (langList.length == 0 ?
              <button
                type="button"
                className="btn btn-primary blue float-right btn-add-lang"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                onClick={openLangModal}
              >Add Language</button> :
              <FlagDropDownButton
                langList={langList}
                selectedLangPos={selectedLang}
                handleClick={selectLanguage}
                openLangModal={openLangModal}
              />
            )
          }


        </Container>
        <hr />
        <Container id="vocab-main">
          {
            (selectedLangCode && 
            <button
              type="button"
              className="btn btn-primary blue"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={openModalAsNewVocab}
            >
              Add new
            </button>)
          }
          {
            (selectedLangCode && <FilterButton onClickItem={getVocabList}></FilterButton>)
          }
          <Container id="vocab-cards" fluid>{cards}</Container>
        </Container>
        
        <Container id="footer" ></Container>
        <Container fluid>
          <VocabModal
            show={show}
            handleClose={handleClose}
            modalMode={modalMode}
            vocab={selectedVocab}
            langCode={selectedLangCode}
            userId={userId}
          />
        </Container>
        <Container fluid>
          <LangModal
            show={langModalShow}
            closeLangModal={closeLangModal}
            userId={userId}
            updateView={updateLangView}
            setUpdateView={setUpdateLangView}
          />
        </Container>
      </Container>
      </ProtectedPage>
    </>
  );
};

export default Vocab;
