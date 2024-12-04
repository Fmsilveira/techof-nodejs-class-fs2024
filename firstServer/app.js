const http = require("http");

const server = http.createServer(
  function (request, response) {
    response.write(`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <button id="change-image">Change Image</button>
  <img id="img">

  <script>
    const IMAGES = [
      "https://services.meteored.com/img/article/el-origen-del-arbol-de-navidad-y-su-relacion-con-el-solsticio-regalos-papa-noel-jesus-nochebuena-1702113256181_1024.jpeg",
      "https://thumbs.dreamstime.com/z/christmas-fir-tree-wooden-background-snowflakes-60149534.jpg",
    ];

    function generateRandomNumber () {
      return parseInt(Math.random() * IMAGES.length);
    }

    window.onload = () => {
      const img = document.getElementById("img");
      img.src = IMAGES[generateRandomNumber()];
    };

    document.getElementById("change-image").addEventListener('click', () => {
      const img = document.getElementById("img");
      img.src = IMAGES[generateRandomNumber()];
    });
  </script>
</body>

</html>`);
    response.end();
  }
)

server.listen(80);

