import React, { useRef, useEffect, useState } from "react";
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
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
import {User} from '@/models/user'
import ProtectedPage from '../protectedPage'
import Link from 'next/link'
import defaultPhoto from '../images/member4.jpg'
import TagModal from "../components/TagsModal";

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
  const [showQuizButton,setShowQuizButton]  = useState<boolean>(false);
  const [memberIcon,setMemberIcon] = useState<string>("");
  const [tagModalShow, setTagModalShow] = useState<boolean>(false);
  const [user,setUser] = useState<User>();
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
      setShowQuizButton(vocabList.length >= 20)
    }
  };

  const getLangList = async function () {
    let _userId = userId;
    if(_userId == ""){
      _userId = localStorage.getItem("userId") || "";
    }
    if(_userId !== ""){
      const _langList:Languages[] = await AxiosHelper.getLangList(_userId);
    setLangList(_langList);
    
    if (_langList.length > 0) {
      setSelectedLangCode(_langList[0].code)
      localStorage.setItem("selectedLang",_langList[0].code)
      if(langList.length == 0){// on first load
        const vocabList = await AxiosHelper.getVocabListByType(_userId,_langList[0].code,"");
        setVocabs(vocabList);
        setShowQuizButton(vocabList.length >= 20)
      }
    }

    const img = await AxiosHelper.getUserIcon(localStorage.getItem("username") || "");
    setMemberIcon(img || "")
    }
    
  };

  const getUserInfo = async function(){
    const userData: User = await AxiosHelper.getUserInfo(userId)
    console.log(userData)
    setUser(userData)
  }

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

  const openTagModal = () => {
    setTagModalShow(true);
  }

  const closeTagModal = () => {
    setTagModalShow(false);
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
    getUserInfo()
  },[])

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
          <Image src={(memberIcon.length > 0 ? memberIcon : defaultPhoto)} className="account-icon" alt="acc" width={200} height={200} />
          <Button variant="outline-success" className="btn-logout" onClick={()=>logout()} >Logout</Button>
          {showQuizButton && <Link href="/quiz"><Button id="btn-quiz" ref={quizButton} variant="info" >Quiz</Button></Link>}
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
              New Vocab
            </button>)
          }
          &nbsp;
          <button
              type="button"
              className="btn btn-primary blue"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={openTagModal}
            >
              Tags
          </button>
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
        <Container fluid>
          <TagModal
            show={tagModalShow}
            closeTagModal={closeTagModal}
            userId={userId}
            updateView={updateLangView}
            setUpdateView={setUpdateLangView}
            tags={user?.tags || []}
          />
        </Container>
      </Container>
      </ProtectedPage>
    </>
  );
};

export default Vocab;
