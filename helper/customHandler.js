function handler(res, status, code, data, message, ...rest) {
  return res.status(code).send({
    status,
    data,
    message,
    ...rest,
  });
}

module.exports = handler;
