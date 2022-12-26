const db = require('../config/db')

const recipeModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes ORDER BY title ASC', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router details
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router insert
  insert: ({title, ingredients, image, image_pub_id, image_url, image_secure_url}) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO recipes (title, ingredients, image, image_pub_id, image_url, image_secure_url)
            VALUES
            ('${title}', '${ingredients}', '${image}', '${image_pub_id}', '${image_url}', '${image_secure_url}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router edit/update
  update: (id, title, ingredients, image) => {
    return new Promise ((resolve, reject) => {
      db.query(`UPDATE recipes SET
        title = COALESCE ($1, title),
        ingredients = COALESCE ($2, ingredients),
        image = COALESCE ($3, image)
        WHERE id = $4
        `,
        [title, ingredients, image, id]
      
            , (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
},
  // router destroy/delete
  destroy: (id) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM recipes where id=${id}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  //lihat data by title
  detailTitle: (title) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from recipes where title ilike '%${title}%'`, (err, res) => {
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
  },
}

module.exports = recipeModel