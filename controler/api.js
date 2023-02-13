
const conn = require('../config/config');

exports.companies = async function (req, res) {
  const { company, email, website, phone } = req.body
  conn.query('INSERT INTO companies SET?', { company: company, email: email, website: website, phone: phone }, (err, result) => {
    let response;
    if (err) {
      response = { message: 'not found', }
      console.log("Error IS :-", err)
    } else {
      response = {
        message: 'post success',
      }
    }
    return res.json({ success: true, message: 'Data insert successfully' });
  })
}

exports.getcompanies = async function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Content-Type', 'application/json');
  let sql = " ";
  if (req.query.company_id) {
    sql = `select * from companies WHERE id =${req.query.company_id}`
  } else {
    sql = 'select * from companies'
  }
  conn.query(sql, (err, results) => {
    if (err) {
      console.log("Error IS :-", err)
    } else {
      res.status(200).json({ status: true, message: "company get successfully", data: results });
    }
  })
}
exports.deleteCompanies = async function (req, res) {
  let id = req.query.company_id
  let sql = `DELETE FROM companies WHERE id=${id}`
  console.log(id, "id", sql)
  conn.query(sql, (err, results) => {
    if (err) {
      console.log("Error IS :-", err)
    } else {
      res.status(200).json({ status: true, message: "company delete successfully" });
    }
  })
}

exports.putCompanies = async function (req, res) {
  let id = req.query.company_id;
  await conn.query("UPDATE companies set company = ?, email = ?, website = ?, phone = ? WHERE id = ?", [req.body.company, req.body.email, req.body.website, req.body.phone, id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ status: true, message: "Update success", data: result })
  });
}