const Sequelize=require('sequelize');

const sequelize=new Sequelize('users','sriramr','',{
    host:'localhost',
    port:5432,
    dialect:'postgres'
});

async function dbconnection(){
    try {
        await sequelize.authenticate();
        console.log("connected");
    } catch (error) {
        console.log("Failed to connect to db");
        console.log(error);
    }
}
dbconnection();
module.exports.connect=sequelize;
/* async  function dbConnection(){
    try {
        await sequelize.authenticate();
        console.log("connected");

        const [results,metadata]=await sequelize.query("select * from userdetails;");
        console.log(results);
        
        const [results2,metadata2]=await sequelize.query("insert into userdetails(Id,Username,Password)values(3,'siva','2222');");
        console.log(metadata2);

        const [results3,metadata3]=await sequelize.query("select * from userdetails;");
        console.log(results3);

        
    } catch (err) {
        console.log(err);
        console.log("can't connect to the db")
    }
}

dbConnection(); */