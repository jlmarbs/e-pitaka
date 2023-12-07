const sql = require('mysql2')

const conn = sql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'epitaka-db'
})

async function findUserById(userId) {
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM account WHERE Account_ID = ?",
            [userId],
            (err, data) => {
                const userInfo = {
                    id: data[0].Account_ID,
                    username: data[0].Username,
                    password: data[0].Password,
                    balance: data[0].Balance,
                    firstName: data[0].FName,
                    lastName: data[0].LName
                }
                resolve(userInfo);
            }
        )
    })
}

async function updateUserBalance(userId, newBalance) {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE account SET Balance = ? WHERE Account_ID = ?",
            [newBalance, userId],
            (err, data) => {
                if (err) {
                    console.error("Failed to Update User Balance")
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

async function saveTransaction(senderID, receiverID, amount, note) {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO user_transaction (Sender_ID, Receiver_ID, Amount, Date, Note) VALUES (?, ?, ?, NOW(), ?)',
            [senderID, receiverID, amount, note],
            (err, data) => {
                if (err) {
                    console.error("Failed to Insert into User Transaction")
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

async function saveAdminTransaction(amount, transaction_type, account_id) {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO admin_transaction (Amount, Date, aTransaction_type, Account_ID) VALUES (?, NOW(), ?, ?)',
            [amount, transaction_type, account_id],
            (err, data) => {
                if (err) {
                    console.error("Failed to Insert into Admin Transaction")
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

module.exports = { findUserById, updateUserBalance, saveTransaction, saveAdminTransaction };