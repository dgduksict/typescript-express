const port = process.env.PORT || 3001;
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

const server = require("./app");

server.listen(port, () => {
  console.log(`Server has started on port: ${port} 🚀`);
});
