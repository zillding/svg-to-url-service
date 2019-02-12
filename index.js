const { stringToUrl } = require("svg-to-url");

function getErrStr(err) {
  if (typeof err === "string") return err;
  if (typeof err === "object" && typeof err.message === "string")
    return err.message;
  return "";
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": 86400
};

module.exports = (req, res) => {
  // enable cors
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "GET") {
    res.end("svg to url service");
    return;
  }

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
