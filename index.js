const express=require('express')
const mysql=require('mysql')
const app=express()
app.listen()
 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"edunomics"
})

db.connect((err)=>{
    if(err) throw err
    console.log("sql server connected..")
})

app.get('/create',(req,res)=>{

    let sql='CREATE TABLE CHANNEL(id int AUTO_INCREMENT PRIMARY KEY,thingname VARCHAR(100),timestamp DATETIME NOT NULL,channel_no int NOT NULL,inputtype VARCHAR(50) NOT NULL,value int NOT NULL,alarmhigh BOOLEAN NOT NULL,alarmlow BOOLEAN NOT NULL,setpoint int NOT NULL,alarmhighsp int NOT NULL,alarmlowsp int NOT NULL,spanh int NOT NULL,spanl int NOT NULL)'
    db.query(sql,(err,result)=>{
        if(err) throw err
        console.log(result)
        res.send("Table created....")
    })
})

app.post("/insert",(req,res)=>{
    const a =req.body;
    //console.log(a)
    var b=a["data"]
    let k=1
    let records=[]
    for(let i in b){
        records.push([a["ThingName"],a["Timestamp"],k,b["Channel"+k]["InputType"],b["Channel"+k]["Value"],b["Channel"+k]["AlarmHigh"],b["Channel"+k]["AlarmLow"],b["Channel"+k]["SetPoint"],b["Channel"+k]["AlarmHighSP"],b["Channel"+k]["AlarmLowSP"],b["Channel"+k]["SPANH"],b["Channel"+k]["SPANL"]])
        k=k+1
    }
    k=1
    console.log(records)
    let sql="INSERT INTO CHANNEL (thingname,timestamp,channel_no,inputtype,value,alarmhigh,alarmlow,setpoint,alarmhighsp,alarmlowsp,spanh,spanl) VALUES ?"
    //let pos = {thingname:a["thingname"],timestamp:a["timestamp"],channel_no:a["channel_no"],inputtype:a["inputtype"],value:a['value'],alarmhigh:a["alarmhigh"],alarmlow:a["alarmlow"],setpoint:a["setpoint"],alarmhighsp:a["alarmhighsp"],alarmlowsp:a["alarmlowsp"],spanh:a["spanh"],spanl:a["spanl"]};
    let q=db.query(sql,[records],(err,result)=>{
        console.log("value inserted...")
        console.log(result)
        res.send("value inserted")

    })
})





app.listen(process.env.port || 4000,function(){
    console.log("listening..");
});