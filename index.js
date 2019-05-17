const mariadb = require('mariadb');

let connection;

async function getConnection() {
  if (connection) {
    return connection;
  }
  connection = await mariadb.createConnection({
    database: 'demo',
    user: 'root',
    password: '123',
    host: 'localhost'
  });

  return connection;
}

/**
 * Insert data to table
 * @param {string} table 
 * @param {object} data 
 */
async function insert(table, data) {
  const columnNames = Object.keys(data);
  const sql = `INSERT INTO ${table} ( ${columnNames.join(', ')}) VALUES (${(Array(columnNames.length)).fill('?').join(', ')})`;
  const connection = await getConnection();
  return connection.query(
    sql,
    columnNames.map((key) => data[key])
  );
}

/**
 * 
 * @param {string} table 
 * @param {object} data 
 * @param {array} where 
 */
async function update(table, data, where) {
  const whereCombine = where.map(({ key, operator, value }) => `${key} ${operator} ${value}`);
  const fieldNames = Object.keys(data);
  const fieldPlaceholders = fieldNames.map((field) => `${field}=?`);
  const sql = `UPDATE ${table} SET ${fieldPlaceholders.join(',')} WHERE ${whereCombine.join(' AND ')}`;

  const connection = await getConnection();
  return connection.query(
    sql,
    fieldNames.map((key) => data[key])
  );
}


async function query() {

}

async function joinTable() {

}
async function bulkInsert() {

}

async function bulkUpdate() {

}

async function deleteRecord() {

}
async function main() {
  // const data = await insert(
  //   'User',
  //   { name: 'Yogurt', age: 2, phone: '099999999999' }
  // );
  const data = await update(
    'User',
    { name: 'Yogurt', age: 100},
    [
      {key: 'id', operator: '=', value: 127}
    ]
  );

  process.exit();

}


main();