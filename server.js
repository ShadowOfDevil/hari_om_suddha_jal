import jsonServer from "json-server";

const server = jsonServer.create();
const route = jsonServer.router("./db.json");
const middleware = jsonServer.defaults({
  static: "./build",
});

const port = 5000;
server.use(middleware);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(route);
server.listen(port, () => console.log( `Server is runnig on ${port}`));
