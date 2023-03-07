require('dotenv').config()
const Pool = require('pg').Pool
const  bcrypt  =  require("bcrypt");
const  jwt  =  require("jsonwebtoken");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.ENV_IP,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
})


const getProducts = (request, response) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


const getProductsById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createProducts = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO products (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateProducts = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE products SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteProducts = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

    const deleteOrders = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`User deleted with ID: ${id}`)
        })
    }

    const getOrders = (request, response) => {
        pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
    
    
    const getOrdersById = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
// Чёта не работает, страница просмотра заказа
      const updateOrders = (request, res) => {
        try {
          for (let i = 0; i < request.body.length; i++) {
            
            const { shipped, id , product_id} = request.body[i]
            console.log(shipped, id , product_id)
             pool.query(
              `UPDATE ordercontent SET shipped = $1 WHERE order_id = $2 AND product_id = $3`,
              [shipped , id, product_id]
            )
          }
          res.sendStatus(200)
        } catch (e) {
          res.sendStatus(500)
          throw e
        }
      
    }

      const createOrder = async (req, res) => {
        const { ordered, weight, location, email } = req.body.values
        const client = await pool.connect()
        try {
          await client.query('BEGIN')
          const ordersData = 'INSERT INTO orders (created_by, location) VALUES ($1, $2) RETURNING *'
          const result = await client.query(ordersData, [email, location])
          const id = result.rows[0].id
          const queryText = 'INSERT INTO ordercontent (order_id, product_id, weight) VALUES ($1, $2, $3) RETURNING *'
          for (let i = 0; i<ordered.length; i++) {
            await client.query(queryText, [id, parseInt(ordered[i]), weight[i]])
          }
          await client.query('COMMIT')
          res.status(200).send(`${result.rows[0].id}`)
        } catch (e) {
          await client.query('ROLLBACK')
          res.sendStatus(500)
          throw e
        } finally {
          client.release()
        }
      }


      const getContentsById = (request, response) => {
        const id = parseInt(request.params.id)
      
        pool.query('SELECT * FROM ordercontent INNER JOIN products ON ordercontent.product_id=products.id WHERE order_id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }


      const getLocation = (request, response) => {
        pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
//Registration Function

const register  =  async (req, res) => {
const { name, email, phonenumber, password } =  req.body;
try {
const  data  =  await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
const  arr  =  data.rows;
if (arr.length  !==  0) {
return  res.status(400).json({
error: "Email already there, No need to register again.",
});
}
else {
bcrypt.hash(password, 10, (err, hash) => {
if (err)
res.status(err).json({
error: "Server error",
});
const  user  = {
name,
email,
phonenumber,
password,
// password: hash,
};
var  flag  =  1; //Declaring a flag

//Inserting data into the database

pool
.query(`INSERT INTO users (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`, [user.name, user.email, user.phonenumber, user.password], (err) => {
if (err) {
flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
console.error(err);
return  res.status(500).json({
error: "Database error"
})
}
else {
flag  =  1;
res.status(200).send({ message: 'User added to database, not verified' });
}
})
if (flag) {
const token = jwt.sign( //Signing a jwt token
{
email: user.email
},
process.env.SECRET_KEY
);
};
});
}
}
catch (err) {
console.log(err);
res.status(500).json({
error: "Database error while registring user!", //Database connection error
});
};
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Verifying if the user exists in the database
  const user = data.rows;
  if (user.length === 0) {
  res.status(400).json({
  error: "User is not registered, Sign Up first",
  });
  }
  else {

  if (password === user[0].password) {
  let err = false
  let result = true //Comparing the hashed password
  // bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
  if (err) {
  res.status(500).json({
  error: "Server error",
  });
  } else if (result === true) { //Checking if credentials match
  const token = jwt.sign(
  {
  email: email,
  },
  process.env.SECRET_KEY
  );
  res.status(200).json({
  message: "User signed in!",
  token: token,
  });
  }
  else {
  //Declaring the errors
  if (result !== true)
  res.status(400).json({
  error: "Enter correct password!",
  });
  }
  } else {
    res.status(400).json({
      error: "User is not registered, Sign Up first",
      });
  }
  }
  } catch (err) {
  console.log(err);
  res.status(500).json({
  error: "Database error occurred while signing in!", //Database connection error
  });
  };
  };


  module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts,
    updateOrders,
    getOrdersById,
    getOrders,
    deleteOrders,
    createOrder,
    getContentsById,
    register,
    login,
    getLocation
  }