const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');

const database = require('../utils/database');

exports.addUser = catchAsync(async (req, res, next) => {
  req.body.password = `${req.body.ssn}`;
  req.body.password = await bcrypt.hash(req.body.password, 12);
  await database.executeQuery(
    `insert into ${req.body.role} 
    values (${req.body.ssn},'${req.body.email}','${req.body.password}','${req.body.name}','${req.body.address}','${req.body.phone}') ;`
  );
  const newUser = await database.executeQuery(
    `select * from ${req.body.role} where ssn=${req.body.ssn}`
  );
  newUser.password = null;
  res.status(201).json({
    stutus: 'success',
    data: {
      newUser: newUser[0]
    }
  });
});
/*
exports.addAdmin = catchAsync(async (req, res, next) => {
  const hashedPass = await bcrypt.hash(req.body.password, 12);
  database.executeQuery(
    `insert into doctor(ssn, name, password, email) values('${req.body.ssn}', '${req.body.name}Admin', '${hashedPass}', '${req.body.email}')`
  );
  res.status(201).json({
    status: 'success',
    data: {
      admin: `'${req.body.name}Admin'`
    }
  });
});
*/
