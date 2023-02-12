import {app,PORT} from './app'

//array
let simpleArray:number[] = [1,2,3,4]
let obj:any = {}

// connecting to database and starting the server asynchronously
const Start = async() =>{
  try{
      app.listen(PORT,()=>{
          console.log("Successfully Connected to Database.");
          console.log(`Server is running on port ${PORT}`)
      });
  }catch(error){
      console.log(error);
      console.log("Server failed to start");
  }
  
}

Start();