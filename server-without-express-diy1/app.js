const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const getIndexPage = async () => {
  const filePath = path.join(__dirname, "public", "index.html");
  return (await fs.readFile(filePath)).toString();
}

const getProductsData = async () => {
  const filePath = path.join(__dirname, "data.json");
  const data = await fs.readFile(filePath);

  return JSON.parse(data.toString());
}

const server = http.createServer(
  async (req, res) => {
    const products = await getProductsData();
    const [laptop] = products;

    let indexPage = await getIndexPage();
    indexPage = indexPage
      .replaceAll('{%PRODUCT%}', laptop.product)
      .replaceAll('{%DESCRIPTION%}', laptop.description)
      .replaceAll('{%PRICE%}', laptop.price);

    res.writeHead(200, { 'content-type': 'text/html'});
    res.write(indexPage);
    res.end();
  }
)

server.listen(3000);
