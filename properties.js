module.exports = {
    zkafull_db: {
        name: "groupo",
        user: "root",
        password: "password5",
        host: process.env.DB_HOST || "127.0.0.1",
        port: 3306,
        dialect: "mysql"
    },

    publicPath: '../Groupomania--7/frontend/build',
    port: 3000,
    tokenSecret: "secretToken",
    api: "/api"
}