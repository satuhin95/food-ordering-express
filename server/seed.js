const {faker} = require('@faker-js/faker');
const _ = require('lodash')


async function main(){
    const MongoClient = require('mongodb').MongoClient;
    const uri = 'mongodb://localhost://27017';
    const client = new MongoClient(uri);

    try{
        await client.connect();
    
        const productsCollection = client.db("food-ordering").collection('products');
        const categoriesCollection = client.db("food-ordering").collection('categories');
    
        productsCollection.drop();
        let categories = ['breakfast','lunch','dinner','drinks'].map((category)=>{return {name:category}});
        await categoriesCollection.insertMany(categories);

        let imagesUrls =[
            "https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/01/22/19/12/pizza-2000595_960_720.jpg",
        ]
        let products =[];
        for (let i = 0; i < 10; i++) {
            let newProduct ={
                name:faker.commerce.productName(),
                adjective:faker.commerce.productAdjective(),
                description:faker.commerce.productDescription(),
                price:faker.commerce.price(),
                category: _.sample(categories),
                images:_.sample(imagesUrls)
            };
            products.push(newProduct);
            
        }
        await productsCollection.insertMany(products);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}
main();
