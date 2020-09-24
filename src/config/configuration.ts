export default() =>({
    port: parseInt(process.env.PORT, 10) || 3000,
    OtherDetails:{
    host: process.env.host
    }
}) 