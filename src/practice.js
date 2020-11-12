const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
    //connection: process.env.DB_URL
})

//console.log('knex and driver installed correctly');

//const q1 = knexInstance('amazong_products').select('*').toQuery()
//const q2 = knexInstance.from('amazong_products').select('*').toQuery()
//console.log('q1:', q1)
//console.log('q2:', q2)

//knexInstance.from('amazong_products').select('*')
//    .then(result => {
//        console.log(result)
//    })

const qry = knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .first()
  .toQuery()
  // .then(result => {
  //   console.log(result)
  // })

console.log(qry)

function searchByProduceName(searchTerm) {
    knexInstance
      .select('product_id', 'name', 'price', 'category')
      .from('amazong_products')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
  }
  
  searchByProduceName('holo')

  // paginateProducts(2)

function getProductsWithImages() {
    knexInstance
      .select('product_id', 'name', 'price', 'category', 'image')
      .from('amazong_products')
      .whereNotNull('image')
      .then(result => {
        console.log(result)
      })
  }
  
  getProductsWithImages()

  // getProductsWithImages()

function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
  }
  
  mostPopularVideosForDays(30)