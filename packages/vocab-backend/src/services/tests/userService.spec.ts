import {
    getUserList,
    getUserEntry,
    getLangListByUserId,
    getAvailableLangListByUserId,
    getUserByName,
    addNewLang,
    createUser,
    getUserId
} from '../userService'
import db from '../../../dbConnector';

describe('user service test', () => {
    it('should get all users', async() => {
        const mockItems = {
            Items: [
                {
                    name: { S: "test_user" }
                }
            ]
        }

        const expectedItems = [
            { name: "test_user" }
        ]

        jest.spyOn(db, 'scan').mockImplementation(() => { return mockItems });
        const items = await getUserList();
        expect(items).toEqual(expectedItems)
    });

    it('should get single user', async() =>{
        const mockItem = {
            Item: 
                {
                    name: { S: "test_user" },
                    langList:{L:[
                        {S:"jp"}
                    ]}
                }
        }

        const expectedItem = { name: "test_user", langList:["jp"] }
        jest.spyOn(db, 'getItem').mockImplementation(() => { return mockItem });
        const item = await getUserEntry("123");
        expect(item).toEqual(expectedItem);

    });

    it('should get lang list by user id', async() =>{
        const mockLangList = {
            Items: [
                {
                    code: { S: "jp" },
                    flag: { S: "flag-jp.png" }
                }
            ]
        }

        const expectedItem = [{ code:"jp", flag:"flag-jp.png" }]
        jest.spyOn(db, 'scan').mockImplementation(() => { return mockLangList });
        const item = await getLangListByUserId("123");
        expect(item).toEqual(expectedItem);
    });

    it('should get available lang list',async()=>{
        const mockLangList = {
            Items: [
                {
                    code: { S: "jp" },
                    flag: { S: "flag-jp.png" }
                }
            ]
        }

        const expectedItem = [{ code:"jp", flag:"flag-jp.png" }]
        jest.spyOn(db, 'scan').mockImplementation(() => { return mockLangList });
        const item = await getAvailableLangListByUserId("123");
        expect(item).toEqual(expectedItem);
    });

    it('should be able to check user exist', async()=>{
        const mockItems = {
            Items: [
                {
                    name: { S: "test_user" }
                }
            ]
        }

        const expectedItems = [
            { name: "test_user" }
        ]

        jest.spyOn(db, 'scan').mockImplementation(() => { return mockItems });
        const items = await getUserByName("test_user");
        expect(items).toEqual(expectedItems)
    });

    it('should be able to get user by name and password', async()=>{
        const mockItems = {
            Items: [
                {
                    _id: { S: "1234" }
                }
            ]
        }

        const expectedItems ="1234"
        jest.spyOn(db, 'scan').mockImplementation(() => { return mockItems });
        const items = await getUserId("test_user","password");
        expect(items).toEqual(expectedItems)
    });

    it('should create new user',async()=>{
        let spy = jest.spyOn(db, 'putItem').mockImplementation(() => { return {} });
        await createUser("test_user","password","","en");
        expect(spy).toBeCalledTimes(1)
    });

    it('should add new lang to user',async()=>{
        let spy = jest.spyOn(db, 'updateItem').mockImplementation(() => { return {} });
        await addNewLang("12345","es");
        expect(spy).toBeCalledTimes(1)
    });
})

