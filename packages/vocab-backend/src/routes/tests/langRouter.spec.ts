import {app}  from '../../../app';
import * as request from 'supertest';
import * as langService from '../../services/langService';

describe ('/langs', ()=>{
    it('gets all available languages',async ()=>{
        const mockItem =  [
            {code:"test"}
        ]
        jest.spyOn(langService,"getLanguageList").mockImplementation(async()=>{return mockItem})
        const res = await request(app)
        .get('/langs');
        //console.log(res);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(mockItem);
    })
})