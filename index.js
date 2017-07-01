const { json, send } = require("micro");
const { router, get, post } = require("microrouter");
const { stringToUrl } = require("svg-to-url");
const cors = require("micro-cors")();

const getReq = () => "svg to url service";

function getErrStr(err) {
  if (typeof err === "string") return err;
  if (typeof err === "object" && typeof err.message === "string")
    return err.message;
  return "";
}

const postReq = async (req, res) => {
  const { data, svgoConfig } = (await json(req)) || {};
  try {
    const result = await stringToUrl(svgoConfig)(data);
    send(res, 200, result);
  } catch (err) {
    const message = getErrStr(err);
    if (message.split("\n")[0].startsWith("Error in parsing SVG:")) {
      send(res, 400, message);
    } else {
      send(res, 500);
    }
  }
};

module.exports = cors(router(get("/", getReq), post("/", postReq)));
