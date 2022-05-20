const Connection =require('../dbconfig/dbconnect');
const { DataTypes }=require('sequelize');

const dbConnection=Connection.connect;

const userDetails=dbConnection.define('userdetails',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
   },
   {
    freezeTableName: true,
    timestamps: false
}
);
dbConnection.sync();
module.exports.createUser=function(username,password){
    userDetails.create({username,password}).then((data)=>{
        console.log(data.toJSON(),"added");
    });
}