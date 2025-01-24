const getProductByCategoryId = async (req, res) => {

    const {categoryId}  = req.params;
    try {
      const products = await Product.find({category: categoryId});
        if(!products || products.length === 0){
            return res.status(404).json({message: `No products found for category with id: ${categoryId}`});
        }
        res.status(200).json({
          data: products,
          message: "This is the category route",
          success: true, 
        }); 
  } catch (error) {
      res.status(500)
        .json({
          error: error.message,
          message: "This is the category route",
          sucess: false,
          products,
        });
    }
  };
  
  export { getProductByCategoryId };