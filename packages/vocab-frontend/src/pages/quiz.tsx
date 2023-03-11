import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  DropdownButton,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import memberLogo from "../images/member4.jpg";
import {shuffle} from "../util";
import Link from 'next/link'
import * as AxiosHelper from "@/helpers/AxiosHelper";
import Vocab from "./vocab";
import Image from 'next/image'

const Quiz = (item:any)=>{

    const quizLength = 10
    const[displayQuestion,setDisplayQuestion] = useState<string>("")
    const[displayAnswer,setDisplayAnswer] = useState<string>("")
    const[displayChoice1,setDisplayChoice1] = useState<string>("")
    const[displayChoice2,setDisplayChoice2] = useState<string>("")
    const[displayChoice3,setDisplayChoice3] = useState<string>("")
    const[displayChoice4,setDisplayChoice4] = useState<string>("")
    const[currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0)
    const[correctAnswerIndex,setCorrectAnswerIndex] = useState<number>(0)
    const[quizList,setQuizList] = useState<Vocab[]>([])
    const[possibleAnswers,setPossibleAnswers]= useState<Vocab[]>([])
    const[correctAnswerCount,setCorrectAnswerCount] = useState<number>(0)
    const[restartQuiz,setRestartQuiz] = useState<number>(0)
    const[showNextButtnon,setShowNextButton] = useState<boolean>(false);
    const[showCorrectText,setShowCorrectText] = useState<boolean>(false);
    const[showIncorrectText,setshowIncorrectText] = useState<boolean>(false);
    const[showTotalScore,setShowTotalScore] = useState<boolean>(false);
    const[showRetryButton,setShowRetryButton] = useState<boolean>(false);
    const[choices1Style,setChoice1Styles] = useState<ChoiceProps>({backgroundColor:""});
    const[choices2Style,setChoice2Styles] = useState<ChoiceProps>({backgroundColor:""});
    const[choices3Style,setChoice3Styles] = useState<ChoiceProps>({backgroundColor:""});
    const[choices4Style,setChoice4Styles] = useState<ChoiceProps>({backgroundColor:""});
    var answerChoiced = false

    interface ChoiceProps {
        backgroundColor:string;
    }

    const getLangListByType = async function (){
        const _userId = localStorage.getItem("userId") || ""
        const _selectedLang = localStorage.getItem("selectedLang") || ""
        console.log("userId=" + localStorage.getItem("userId") + " , selectedLangCode=" + localStorage.getItem("selectedLang"))
        const vocabList: Vocab[] = await AxiosHelper.getVocabListByType(_userId,_selectedLang,"");
        loadQuiz(vocabList)
    }

    const loadQuiz = function(vocabList: Vocab[]){
        var possibleAnswersLocal: Vocab[] = []
        vocabList.map((vocab)=>{
            possibleAnswersLocal.push(vocab)
        })
        var quizListLocal = shuffle(vocabList).slice(0,quizLength)
        setQuizList(shuffle(vocabList).slice(0,quizLength))
        setPossibleAnswers(possibleAnswersLocal)
        loadQuestionCache(quizListLocal,possibleAnswersLocal,0)
    }

    const loadQuestion = ()=>{
        var currentQuestionIndexLocal = currentQuestionIndex + 1
        if(currentQuestionIndexLocal < quizLength){
            setCurrentQuestionIndex(currentQuestionIndexLocal)
            loadQuestionCache(quizList,possibleAnswers,currentQuestionIndexLocal)
        }
    }

    const loadQuestionCache = function(quizListLocal:Vocab[],possibleAnswersLocal:Vocab[],currentQuestionIndexLocal:number){
        if(currentQuestionIndexLocal < quizLength){
            const question = quizListLocal[currentQuestionIndexLocal]
            var possibleAnswerList:Vocab[] = []
            possibleAnswersLocal.map((answer)=>{
                if(answer.vocab != question.vocab){
                    possibleAnswerList.push(answer)
                }
            })
            var answerList = shuffle(possibleAnswerList).slice(0,3)
            var correctAnswerIndexLocal = 0
            answerList.push(question)
            answerList = shuffle(answerList)
            for(var i = 0 ; i < 4 ; i++){
                console.log(answerList[i].vocab + "=" + question.vocab + " is " + (answerList[i].vocab == question.vocab))
                if(answerList[i].vocab == question.vocab){
                    correctAnswerIndexLocal = i
                }
            }
            setCorrectAnswerIndex(correctAnswerIndexLocal)
            setDisplayQuestion(question.vocab)
            setDisplayChoice1(answerList[0].meaning)
            setDisplayChoice2(answerList[1].meaning)
            setDisplayChoice3(answerList[2].meaning)
            setDisplayChoice4(answerList[3].meaning)
            setDisplayAnswer(question.meaning)
            setShowNextButton(false);
            setShowCorrectText(false);
            setshowIncorrectText(false);
            setShowTotalScore(false);
            setShowRetryButton(false);
            setChoice1Styles({backgroundColor:""});
            setChoice2Styles({backgroundColor:""});
            setChoice3Styles({backgroundColor:""});
            setChoice4Styles({backgroundColor:""});
        }
        
    }

    const validateAnswer = (index:number)=>{
        answerChoiced = true
        if(currentQuestionIndex < 9){
            setShowNextButton(true);
        }else{
            setShowTotalScore(true);
            setShowRetryButton(true);
        }
        if(index == correctAnswerIndex){
            setCorrectAnswerCount(correctAnswerCount + 1)
            setShowCorrectText(true);
        }else{
            setshowIncorrectText(true);
        }
    }

    const resetQuiz = ()=>{
        setRestartQuiz(restartQuiz + 1)
        setCurrentQuestionIndex(0)
        setCorrectAnswerCount(0)
    }

    useEffect(() => {
        getLangListByType();
      }, [restartQuiz]);

    return(
        <>
        <Container id="quiz-page" fluid>
            <Container id="navbar">
                <Image src={memberLogo} className="account-icon" alt="acc" width={200} height={200} />
                <Link href='/login' ><Button variant="outline-success" className="btn-logout" onClick={item.logout}>Logout</Button></Link>
                <Link href='/vocab' ><button type="button" className="btn btn-primary blue btn-float-right">Go Back</button></Link>
                {showRetryButton && <button type="button" className="btn btn-primary blue btn-float-right" onClick={resetQuiz}>Restart Quiz</button>}
            </Container>
            <hr/>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8} lg={8} id="quiz-panel">
                        <h1 className="center">Question {currentQuestionIndex + 1}</h1>
                        <p className="center">Please select the correct translation</p>
                        <br/>
                        <h2 className="center">{displayQuestion}</h2>
                        <br/>
                        <div className="quizbox" style={choices1Style} id="choice1" 
                            onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(0); 
                                setChoice1Styles({backgroundColor:"lightgray"})
                            }}}>
                            <p>{displayChoice1}</p>
                        </div>
                        <div className="quizbox" style={choices2Style} id="choice2" onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(1); 
                                setChoice2Styles({backgroundColor:"lightgray"})
                            }}}>
                            <p>{displayChoice2}</p>
                        </div>
                        <div className="quizbox" style={choices3Style} id="choice3" onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(2); 
                                setChoice3Styles({backgroundColor:"lightgray"})
                            }}}>
                            <p>{displayChoice3}</p>
                        </div>
                        <div className="quizbox" style={choices4Style} id="choice4" onClick={()=>{
                            if(!answerChoiced){
                                validateAnswer(3); 
                                setChoice4Styles({backgroundColor:"lightgray"})
                            }}}>
                            <p>{displayChoice4}</p>
                        </div>
                    </Col>
                    {showCorrectText && <p className="text-correct">Correct!</p>}
                    {showIncorrectText && <p className="text-incorrect">Incorrect! The answer is : {displayAnswer}</p>}
                    {showNextButtnon && <button type="button" className="btn btn-primary blue btn-next-quiz" onClick={loadQuestion}>Next &gt;</button>}
                    {showTotalScore && <p className="text-total-score">Total Score: {correctAnswerCount}/10</p>}
                </Row>
            </Container>
        </Container>
        </>
    )
}

export default Quiz;