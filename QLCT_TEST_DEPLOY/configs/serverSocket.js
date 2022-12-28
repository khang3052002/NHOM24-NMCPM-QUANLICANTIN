const dbModel=require('../models/dbHelpers/dbHelpers')
var listSocketID=[]
var dataObj = {};
var targetProxy = new Proxy(dataObj, {
  set: function (target, key, value) {
      sendToAllSocket()
      target[key] = value;
      return true;
  }
});

// varWatch=12
const io=require('./customConfig').io
const pushID=(id)=>{
    listSocketID.push(id)
}
const popID=(id)=>{
    listSocketID= listSocketID.filter(item => item != id)

}
const sendToAllSocket=async()=>{
    try{
        var result=await dbModel.getCurrentStorageOfAll()
        var info={so_du:0}
        try{
            info=await dbModel.getUserBalance(dataObj.id)
            if(Array.isArray(info) && info.length>0){
                info=info[0]
            }
        }
        catch(err){

        }
        if(result.rows){
            result=result.rows
            for(i=0;i<listSocketID.length;i++){

                io.to(listSocketID[i]).emit('send datachange',{data:result,info:{id:dataObj.id,balance:info.so_du}})
            }
        }
    }
    catch(err){

    }
    
}
module.exports = {listSocketID, targetProxy,pushID,popID ,sendToAllSocket};
