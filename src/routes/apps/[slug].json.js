import path from "path";
import { promises } from "fs";
const { readFile } = promises;

const getApp = (fileName) => {
  return readFile(path.resolve("static/apps/", `${fileName}.json`), "utf-8");
};

export function get(req, res, _) {
  const { slug } = req.params;

  const post = getApp(slug);

  if (post) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(post);
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}