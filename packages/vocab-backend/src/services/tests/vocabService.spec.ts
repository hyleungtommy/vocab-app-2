import {
    addVocab,
    getVocabList,
    getVocabEntry,
    getVocabListByUserIdAndLangCode,
    updateVocab,
    deleteVocab,
    filterByType
 }from '../vocabService'
 import db from '../../../dbConnector';

 describe('vocabService tests',()=>{
    it('should add new vocab',async()=>{
        let spy = jest.spyOn(db, 'putItem').mockImplementation(() => { return {} });
        await addVocab({});
        expect(spy).toBeCalledTimes(1)
    })

    it('should get all vocabs',async()=>{
        const mockItems = {
            Items: [
                {
                    vocab: { S: "test" }
                }
            ]
        }

        const expectedItem = [{ vocab:"test"}]
        jest.spyOn(db, 'scan').mockImplementation(() => { return mockItems });
        const items = await getVocabList();

        expect(items).toEqual(expectedItem);
    })

    it('should get vocab by id',async()=>{
        const mockItems = {
            Item: 
                {
                    vocab: { S: "test" }
                }
        }

        const expectedItem = { vocab:"test"}
        jest.spyOn(db, 'getItem').mockImplementation(() => { return mockItems });
        const items = await getVocabEntry("123");

        expect(items).toEqual(expectedItem);
    })

    it('should get a list of vocab by user id and lang, and sort them by create date',async () => {
        const mockItems = {
            Items: [
                {
                    vocab: { S: "test" },
                    createdAt: {N: 100}
                },
                {
                    vocab: { S: "test2" },
                    createdAt: {N: 300}
                },
                {
                    vocab: { S: "test3" },
                    createdAt: {N: 200}
                }
            ]
        }

        const expectedItem = [
            { vocab:"test2",createdAt:300},
            { vocab:"test3",createdAt:200},
            { vocab:"test",createdAt:100}
        ]

        jest.spyOn(db, 'scan').mockImplementation(() => { return mockItems });
        const items = await getVocabListByUserIdAndLangCode("123","jp");
        expect(items).toEqual(expectedItem);
    })

    it('should update vocab',async()=>{
        const vocab = {
            _id:123,
            vocab:"test",
            type:"V",
            meaning:"meaning",
            sentence:"sentence",
            translation:"translation",
            note:"note"
        }
        const spy = jest.spyOn(db, 'updateItem').mockImplementation(() => { return {} });
        await updateVocab(vocab);
        expect(spy).toBeCalledTimes(1)
    })

    it('should delete vocab', async()=>{
        const spy = jest.spyOn(db, 'deleteItem').mockImplementation(() => { return {} });
        await deleteVocab("123");
        expect(spy).toBeCalledTimes(1)
    })

    it('should return vocab by type and sort by create date', async()=>{
        const mockItems = {
            Items: [
                {
                    vocab: { S: "test" },
                    createdAt: {N: 100}
                },
                {
                    vocab: { S: "test2" },
                    createdAt: {N: 300}
                },
                {
                    vocab: { S: "test3" },
                    createdAt: {N: 200}
                }
            ]
        }

        const expectedItem = [
            { vocab:"test2",createdAt:300},
            { vocab:"test3",createdAt:200},
            { vocab:"test",createdAt:100}
        ]

        jest.spyOn(db, 'scan').mockImplementation(() => { return mockItems });
        const items = await filterByType("123","jp","V");
        expect(items).toEqual(expectedItem);
    })
 })