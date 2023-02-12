import {test,getLanguageList} from '../langService'
import db from '../../../dbConnector';
describe('test if jest is running', () => {
    it('adds 1 + 2 to equal 3', () => {
      expect(test(1, 2)).toBe(3);
    });
});

describe('lang service test', ()=>{
  it('should get all languages in table',async ()=>{
    const mockItems = {
      Items:[
        {
          code:{S:"test"}
        }
      ]
    }

    const expectedItems = [
        {code:"test"}
    ]

    jest.spyOn(db,'scan').mockImplementation(()=>{return mockItems});
    const items = await getLanguageList();
    expect(items).toEqual(expectedItems)
  })
})

