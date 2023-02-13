const conn = require("../config/config");

exports.createUser = async function (req, res) {
    var connection = req.connection
    console.log("connection", req.file)
    try {
        let { name, email, password, company, phone, address } = req.body;
        conn.query(`SELECT * from Users WHERE email ="${email}"`, (err, result) => {
            console.log(343354, result, err)
            if (result.length == 0) {
                conn.query(`SELECT * from Users WHERE phone ="${phone}"`, (err, result) => {
                    console.log('phone', result, err)
                    if (result.length == 0) {
                        if (req.file == null || req.file == undefined) {
                            return res.json({ success: false, message: 'image is require' });
                        } else {
                            const url = 'data:image/png;base6....';
                            fetch(url)
                                .then(res => res.blob())
                                .then(blob => {
                                    const file = new File([blob], "File name", { type: "image/png" })
                                    console.log(file,"777777")
                                })
                            conn.query("INSERT INTO Users SET?", { name: name, image: req.file.filename, email: email, password: password, company: company, phone: phone, address: address },
                                (err, result) => {
                                    if (err) {
                                        console.log(err, 555)
                                        return res.json({ success: false, message: 'Internal server error' });
                                    }
                                    return res.json({ success: true, message: 'Data insert successfully' });
                                });
                        }
                    } else {
                        return res.json({ success: false, message: 'Phone Number is already exit' });
                    }
                })
            } else {
                return res.json({ success: false, message: 'Email is already exit' });
            }
        })
    } catch (error) {
        return res.json({ success: false, message: 'Something went wrong' });
    }
}

exports.getUsers = async function (req, res) {
    let sql = " ";
    if (req.query.user_id) {
        sql = `select * from Users WHERE id =${req.query.user_id}`
    } else {
        sql = 'select * from Users'
    }
    conn.query(sql, (err, results) => {
        if (err) {
            console.log("Error IS :-", err)
        } else {
            res.status(200).json({ status: true, message: "company get successfully", data: results });
        }
    })
}

exports.deleteUser = async function (req, res) {
    try {
        let id = req.query.user_id
        let sql = `DELETE FROM Users WHERE id =${id}`;
        conn.query(sql, (err, result) => {
            if (err) throw err
            res.status(200).json({ success: true, message: "User delete success" })
        })
    } catch (error) {
        console.log(error)
    }
}

// exports.updateUser = async function (req, res) {
//     let id = req.query.user_id;
//     console.log(req.body)
//     await conn.query("UPDATE Users set name = ?, email = ?, password = ?, company = ?,phone = ?,address = ? WHERE id = ?", [req.body.name, req.body.email, req.body.password, req.body.company,req.body.phone,req.body.address, id], (err, result) => {
//       if (err) throw err;
//       res.status(200).json({ status: true, message: "Update success", data: result })
//     });
//   }


exports.updateUser = async function (req, res) {
    let id = req.query.user_id;
    console.log(req.body, "oooooooooo", id)
    await conn.query("UPDATE Users set name = ?, email = ?, password = ?, company = ?, phone = ?, address = ? WHERE id = ?", [req.body.name, req.body.email, req.body.password, req.body.company, req.body.phone, req.body.address, id], (err, results) => {
        if (err) throw err
        res.status(200).json({ success: true, message: "User update success" })
    })
}

exports.getAllTable = async function(req,res){
    let sql = 'SELECT * FROM Users INNER JOINT companies'

//     'CREATE TABLE states(
// id INT NOT NULL AUTO_INCREMENT UNIQUE,
// state_name VARCHAR(50),
// countries_id INT NOT NULL,
// FOREIGN KEY(country_id) REFERENCES country(country_id)
// );'
}
