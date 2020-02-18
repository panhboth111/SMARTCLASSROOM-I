const { PythonShell } = require("python-shell");
module.exports = (filename, args = []) => {
  let options = {
    mode: "text",
    args: args.map(arg => arg)
  };
  PythonShell.run(`python/${filename}`, options, err => {
    if (err) console.log(err);
  });
};
