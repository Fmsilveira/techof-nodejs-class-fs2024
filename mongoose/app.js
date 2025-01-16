const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ProdutoModel = require('./ProdutoModel');

const connectionString = "mongodb+srv://my-new-user:GAWTJzwatdDzC3mZ@techof.0l1vepo.mongodb.net/tech-of-mongodb-class-04-2024?retryWrites=true&w=majority&appName=TechOf";

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
}));

// mongoose.connect(connectionString);

const validateRequestBodyMiddleware = (req, res, next) => {
  function validateRequestBody (params) {
    if (params.age < 0) {
      return res.status(400).json({
        message: "invalid age"
      })
    }

    if (params.price < 0) {
      return res.status(400).json({
        message: "invalid price"
      })
    }
  }

  validateRequestBody(req.body);
  next();
}

app.post('/produtos', 
  validateRequestBodyMiddleware,
  async (req, res, next) => {
  const { body } = req;
  const {
    title,
    description,
    price,
    age
  } = body;

  try {
    await mongoose.connect(connectionString);

    const newProduct = new ProdutoModel({
      title,
      description,
      price,
      age
    });
    await newProduct.save();

    res.json({
      success: true,
      produto: newProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produto: {}
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.post('/produtos/bulk', async (req, res, next) => {
  const { products } = req.body;

  const productsModels = products.map(product => {
    const {
      title,
      description,
      price,
      age
    } = product;


    return new ProdutoModel({
      title,
      description,
      price,
      age
    });
  });

  try {
    await mongoose.connect(connectionString);

    await ProdutoModel.insertMany(productsModels);

    res.json({
      success: true,
      produtos: productsModels
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produtos: []
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.patch('/produtos/:id', 
  validateRequestBodyMiddleware,
  async (req, res, next) => {
  const {
    title,
    description,
    price,
    age
  } = req.body;
  const { id } = req.params;

  try {
    await mongoose.connect(connectionString);

    const newProduct = {
      title,
      description,
      price,
      age
    };
    // const produto = await ProdutoModel.findByIdAndUpdate(
    //   id,
    //   newProduct,
    //   {
    //     runValidators: true,
    //     returnDocument: 'after',
    //     lean: true,
    //     upsert: false,
    //   }
    // );

    const [produto] = await ProdutoModel.find({
      _id: id
    });
    produto.price = price;
    produto.age = age;

    await produto.save();

    res.json({
      success: true,
      produto,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produto: {}
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.get('/produtos/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await mongoose.connect(connectionString);
    const produto = await ProdutoModel.findById(id);

    res.json({
      success: true,
      produto: produto
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      produto: {}
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.get('/produtos', async (req, res, next) => {
  const {
    limit,
    page,
    sortBy,
    sortOrder,
    ...queryObj
  } = req.query;

  console.log('queryObj', queryObj);
  Object.keys(queryObj).forEach(key => {
    console.log('key', key, 'queryObj[key]', queryObj[key], JSON.parse(queryObj[key]))
    queryObj[key] = JSON.parse(queryObj[key])
  })
  console.log('queryObj depois parse', queryObj);

  try {

    const produtos = await ProdutoModel.find(
      queryObj,
      {
      },
      {
        limit,
        skip: Number(page) * Number(limit),
      }
    );

    return res.json({
      success: true,
      produtos: produtos
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produtos: []
    })
  } finally {
    // await mongoose.connection.close();
  }
});

app.get('/statistics', async (req, res, next) => {
  try {
    await mongoose.connect(connectionString);

    const produtos = await ProdutoModel.aggregate([
      {
        $match: {
          age: {
            $gt: 1
          }
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          },
          averagePrice: {
            $avg: '$price'
          },
          minimumPrice: {
            $min: "$price",
          },
          maximumPrice: {
            $max: '$price'
          }
        }
      }
    ])

    return res.json({
      success: true,
      produtos: produtos
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      produtos: []
    })
  } finally {
    await mongoose.connection.close();
  }
});

app.listen(3001, () => {
  console.log('Server listening 3001')
})
