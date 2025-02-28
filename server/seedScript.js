import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/product.js';
import Category from './models/category.js';
import { categoriesData, productData } from './seedData.js';

dotenv.config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Delete existing data
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log("Old data removed");

        // Insert categories
        const categoryDocs = await Category.insertMany(categoriesData);
        console.log("Categories inserted:", categoryDocs);

        // Create a map of category names to IDs
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        }, {}); // Added missing initial {}

        // Attach correct category IDs to products
        const productWithCategoryIds = productData.map((product) => ({
            ...product,
            category: categoryMap[product.category] || null, // Ensure valid category
        }));

        await Product.insertMany(productWithCategoryIds);
        console.log("Products inserted successfully");

    } catch (error) {
        console.error("Error connecting to database:", error.message);
    } finally {
        mongoose.connection.close();
        console.log("Database connection closed");
    }
}

seedDatabase();



// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import Product from './models/product.js';
// import Category from './models/category.js';
// import { categoriesData, productData } from './seedData.js';


// dotenv.config();

// async function seedDatabase() {
//     try {
//         await mongoose.connect(process.env.MONGO_URL)
//         await Product.deleteMany({})
//         await Category.deleteMany({})

//         const categoryDocs = await Category.insertMany(categoriesData)
//         const categoryMap = categoryDocs.reduce((map,category)=>{
//             map[category.name] = category._id;
//             return map;
//         })
//         const productWithCategoryIds = productData.map((product)=>({
//             ...product,
//             category: categoryMap[product.category],
//         }))
//         await Product.insertMany(productWithCategoryIds);
//         console.log("Categories Seeded Successfully");
//     } catch (error) {
//         console.error("Error connecting to database:",error.message);
//     }finally{
//         mongoose.connection.close();
//     }
    
// }
