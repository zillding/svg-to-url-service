const { stringToUrl } = require("svg-to-url");

function getErrStr(err) {
  if (typeof err === "string") return err;
  if (typeof err === "object" && typeof err.message === "string")
    return err.message;
  return "";
}

module.exports = (req, res) => {
  // enable cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { data, svgoConfig } = JSON.parse(body);
      const result = await stringToUrl(svgoConfig)(data);
      res.end(result);
    } catch (err) {
      const message = getErrStr(err);
      if (message.split("\n")[0].startsWith("Error in parsing SVG:")) {
        res.statusCode = 400;
        res.end(message);
      } else {
        res.statusCode = 500;
        res.end();
      }
    }
  });
};
