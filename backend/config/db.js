// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// // Validate environment variables
// if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
//     console.error("❌ Missing required database environment variables.");
//     process.exit(1);
// }

// // Create a Sequelize instance
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT || "mysql",
//     logging: false,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },
// });

// // // Test database connection
// // (async () => {
// //     try {
// //         await sequelize.authenticate();
// //         console.log("✅ Connected to MySQL database successfully!");
// //     } catch (error) {
// //         console.error("❌ Database connection failed:", error.message);
// //         process.exit(1);
// //     }
// // })();

// module.exports = sequelize;
const mongoose = require('mongoose');
const db= async ()=>{
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
db();