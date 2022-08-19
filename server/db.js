import mariadb from 'mariadb';

const POOL = mariadb.createPool(
    {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'becode',
        password: process.env.DB_SECRET || 'becode',
        database: process.env.DB_NAME || 'EBAY',
        port: 3306
    }
)
export default class ProductController {
    constructor() {
        POOL.getConnection().then(
            connection => this.connection = connection,
        );
    }
    // async doStuff() {
    //     const query = `SELECT * FROM product_table`;
    //     const result = await this.connection.query(query);
    //     console.log(result)
    //     return result[0];
    // }
}
