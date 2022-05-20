"use strict";

const Hapi = require('@hapi/hapi');
const Inert=require('@hapi/inert');
const path=require('path');
const Vision=require('@hapi/vision');
const Connection=require('./dbconfig/dbconnect')
const userDetails=require('./models/userDetails')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "127.0.0.1",
        routes:{
            files:{
                relativeTo: path.join(__dirname,'static')
            }
        }
    });

    await server.register([{
        plugin: Inert
    },
    {
        plugin:Vision
    }])

    server.views({
        engines:{
            html:require('handlebars')
        },
        path:path.join(__dirname,'views'),
        layout:'default'
    })


    server.route([{
        path:'/',
        method:'GET',
        handler:(request,h)=>{
            return h.file('Home.html')
        }
    },
    {
        path:'/getusers',
        method:'GET',
        handler:async (request,h)=>{
            const dbConnection=await Connection.connect;
            const [results,metadata]= await dbConnection.query("select * from userdetails;");
            console.log(results);
            return h.view('index',{results});
        }
    }, 
    {

        path: '/login',
        method: 'POST',
        handler: async (request, h) => {
            userDetails.createUser(request.payload.username,request.payload.password);
            const dbConnection=await Connection.connect;
            const [results,metadata]= await dbConnection.query("select * from userdetails;");
            return h.view('index',{username:request.payload.username,results:results});
        }
    }
    /* {
        path: '/users/{user?}',
        method: 'GET',
        handler: (request, h) => {
            return `<h1>HOLA ${request.params.user}, the secret number is 9182536</h1>`;
            
        }
    },
    {
        path:'/places',
        method:'GET',
        handler:(request,h)=>{
            return h.view('places');
        }
    } */,
    {
        path: '/{any*}',
        method: 'GET',
        handler: (request, h) => {
            return 'OOPS! YOU MUST BE LOST';

        }
    }

    ]);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
};
init();