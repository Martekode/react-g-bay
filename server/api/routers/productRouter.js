import
async doStuff() {
    const query = `SELECT * FROM product_table`;
    const result = await this.connection.query(query);
    console.log(result)
    return result[0];
}