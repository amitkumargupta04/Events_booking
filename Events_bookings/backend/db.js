import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amit@123",
    database: "event_booking",
});

db.connect((err) => {
    if(err) throw err;
    console.log("MySQL Connected!");
});
