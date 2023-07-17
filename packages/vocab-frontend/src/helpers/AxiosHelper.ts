import url from '../awsurl'
import axios from "axios";
import { Vocab } from '@/models/vocab';
import { Languages } from '@/models/language';
import { LoginResponse } from '@/models/LoginResponse';
import { User } from '@/models/user';

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};


const getVocabList = async function (userId: string, langCode: string): Promise<Vocab[]> {
    const resp = await axios.get(url + `/vocabs/${userId}/${langCode}`, { headers: headers })
    return resp.data;
}

const getLangList = async function (userId: string): Promise<Languages[]> {
    const resp = await axios.get(url + `/users/${userId}/langlist`, { headers: headers })
    return resp.data
}

const getVocabListByType = async function (userId: string, selectedLangCode: string, type: string): Promise<Vocab[]> {
    let resp: any;
    if(type === ""){
        resp = await axios.get(url + `/vocabs/${userId}/${selectedLangCode}`, { headers: headers })
    }else{
        resp = await axios.get(url + `/vocabs/filter/${userId}/${selectedLangCode}/${type}`, { headers: headers })
    }
    return resp.data
}

const getAvailableLangList = async function (userId: string): Promise<Languages[]> {
    const resp = await axios.get(url + `/users/${userId}/availangs`, { headers: headers })
    return resp.data
}

const addNewLang = async function (userId: string, code: string): Promise<void> {
    const body = {
        userId: userId,
        code: code
    };
    await axios.put(url + "/users/newlang", body, { headers: headers })
}

const addNewVocab = async function (vocab: Vocab): Promise<void> {
    const body = {
        vocab: vocab.vocab,
        type: vocab.type,
        meaning: vocab.meaning,
        sentence: vocab.sentence,
        translation: vocab.translation,
        note: vocab.note,
        langCode: vocab.langCode,
        userId: vocab.userId,
        tags: vocab.tags
    };
    await axios.post(url + "/vocabs", body);
}

const updateVocab = async function (vocab: Vocab): Promise<void> {
    const body = {
        _id: vocab._id,
        vocab: vocab.vocab,
        type: vocab.type,
        meaning: vocab.meaning,
        sentence: vocab.sentence,
        translation: vocab.translation,
        note: vocab.note,
        tags: vocab.tags
    };
    await axios.put(url + `/vocabs/${vocab._id}`, body, { headers: headers })
}

const deleteVocab = async function (vocabId: string): Promise<void> {
    await axios.delete(url + `/vocabs/${vocabId}`, { headers: headers })
}

const login = async function (username:string,password:string):Promise<LoginResponse> {
    const body = {
        username: username,
        password: password
    };
    const resp = await axios.post(url + "/users/login", body, { headers: headers })
    return resp.data
}

const isUsernameExists = async function (username:string): Promise<boolean> {
    const {data} = await axios.get(url + `/users/${username}/exist`, { headers: headers })
    return (data && data.length > 0);
}

const createUser = async function (username:string,password:string): Promise<void> {
    const body = {
        username: username,
        password: password,
        firstLang: '',
        motherLang:'en'
      };
      await axios.post(url + "/users", body, { headers: headers })
}

const getUserInfo = async function (userid:string):Promise<User>{
    const {data} = await axios.get(url + `/users/${userid}`, { headers: headers })
    return data;
}

const uploadUserIcon = async function(username:string, uploadPhoto:File): Promise<void>{
    const formData = new FormData();
    formData.append('username', username);
    formData.append('file', uploadPhoto);
    await axios.post(url + "/users/photo", formData, { headers: {'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "*" }})
}

const getUserIcon = async function(username:string): Promise<string>{
    const resp = await axios.get(url + `/users/${username}/photo`, { headers: {'Content-Type': 'text/plain'} })
    return resp.data
}

const replaceUserTagList = async function(userid:string, tags: string[]): Promise<void>{
    const body = {
        tags:tags
      };
    await axios.put(url + `/users/${userid}/tags`, body, { headers: headers })
}

export {
    getVocabList,
    getLangList,
    getVocabListByType,
    getAvailableLangList,
    addNewLang,
    addNewVocab,
    updateVocab,
    deleteVocab,
    login,
    isUsernameExists,
    createUser,
    getUserInfo,
    uploadUserIcon,
    getUserIcon,
    replaceUserTagList
};
