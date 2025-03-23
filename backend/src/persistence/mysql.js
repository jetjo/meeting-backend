const waitPort = require('wait-port');
const fs = require('fs');
const mysql = require('mysql2');
const { EOL } = require('node:os');

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;

async function init() {
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    const _password = PASSWORD_FILE
        ? fs.readFileSync(PASSWORD_FILE, { encoding: 'utf-8' })
        : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;
    const password = PASSWORD_FILE
        ? _password.slice(0, _password.indexOf(EOL))
        : _password; // + 1) : _password;
    console.log({
        host,
        user,
        password,
        database,
        PASSWORD_FILE,
        PASSWORD,
        EOL,
    });

    await waitPort({
        host,
        port: 3306,
        timeout: 10000,
        waitForDns: true,
    });

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
        charset: 'utf8mb4',
    });

    // process.stderr.write('???');

    // throw new Error('???');

    console.error('???');

    const todos = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    const parks = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS parks (id varchar(36), name varchar(16), county varchar(16)) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    const buildings = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS buildings (id varchar(36), name varchar(16)) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    const meetings = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS meetings (id varchar(36), name varchar(16), deviceInfoId varchar(36), image varchar(255), locationId varchar(36), personNum int, rangesId varchar(36)) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    const deviceInfos = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS devices (id varchar(36), name varchar(255)) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    const locations = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS locations (id varchar(36), buildName varchar(16), floorName varchar(16), parkName varchar(16)) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    const ranges = new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS ranges (id varchar(36), start varchar(16), end varchar(16)) DEFAULT CHARSET utf8mb4',
            (err) => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });

    return Promise.all([
        todos,
        parks,
        buildings,
        meetings,
        deviceInfos,
        locations,
        ranges,
    ]);
}

async function teardown() {
    return new Promise((acc, rej) => {
        pool.end((err) => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map((item) =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function getItem(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map((item) =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}

async function storeItem(item) {
    return new Promise((acc, rej) => {
        pool.query(
            'INSERT INTO todo_items (id, name, completed) VALUES (?, ?, ?)',
            [item.id, item.name, item.completed ? 1 : 0],
            (err) => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE todo_items SET name=?, completed=? WHERE id=?',
            [item.name, item.completed ? 1 : 0, id],
            (err) => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function removeItem(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM todo_items WHERE id = ?', [id], (err) => {
            if (err) return rej(err);
            acc();
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
};
