const logger = (req, res, next) => {
  console.log(
    `${req.method}${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
}; // next()가 있으면 request를 다음에 넘겨준다
module.exports = logger;
