import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'William0601*',
  database: 'EcoDescart',
  dateStrings: true,
  typeCast: (field, next) => {
    if (field.type === 'DATE') return field.string();
    return next();
  }
});

console.log('✅ Conectado ao MySQL com Promises!');

export default db;
