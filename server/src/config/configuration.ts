export default ()=>({
    mysql: {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    },
    
    // .env에 어느 정도의 환경 변수까지 고려할지
    path: {
        image: "img",
        md: "markdown"   
    },

    auth: {
        acc_token_secret: process.env.ACC_TOKEN,
        ref_token_secret: process.env.REF_TOKEN,
    },

    server: {
        port: process.env.SERVER_PORT,
        cors_port: process.env.CORS_PORT,
    },

    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: ""
    }
})
