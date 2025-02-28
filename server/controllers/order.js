import Razorpay from "razorpay"
import crypto from "crypto"
import Order from "../models/order.js"
import Transection from "../models/transection.js"

const createTransection = async (req, res) => { 
    const {amount, userId} = req.body;
    const razorpay = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY_ID,
        key_secret : process.env.RAZOR_PAY_SECRET
    });

    const options={
        amount:amount,
        currency:"INR",
        receipt:`receipt#{Date.now()}`
    }
    try{
        
        if(!amount || !userId){
            return res.status(400).json({
                success:false,
                message:"Amount and User id Required"
            })
        }

        const razorpayOrder = await razorpay.orders.create(options)
        res.status(201).json({
             success:true,
             message:"order created successfully",
             key:process.env.RAZOR_PAY_KEY_ID,
             amount:razorpayOrder.amount,
             currency:razorpayOrder.currency,
             order_id:razorpayOrder.id
        })

    }
    catch (error){
        res.status(500).json({
            success:false,
            message:"failed to Create Order",
            error:error.message,
        })
    }
};

const createOrder = async(req, res)=>{
    const{
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        cartItems,
        deliveryDate,
        address
    } = req.body;

    const key_secret = process.env.RAZOR_PAY_KEY_ID;
    const genrate_signature = crypto.createHmac('sha256',key_secret).update(razorpay_order_id+"|"+razorpay_payment_id).digest('hex')
    if(generate_signature === razorpay_signature){
        try {
            const transection = await Transaction.create({
                user:userId,
                order_id:razorpay_order_id,
                status:"success",
                amount: cartItems.reduce((total,item)=>total+item?.Quantity*item?.price,0),
            })

            const order = await Order.create({
                user:userId,
                cartItems,
                deliveryDate,
                items:cartItems?.map(item=>({
                    product:item?._id,
                    quantity:item?.quantity,
                })),
                status:"Order Placed",
            });
            transection.order = order._id;
            await transection.save();
            res.status(201).json({
                success:true,
                message:"Payment Verified and Order Created",
                order,
                // transection,
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"failed to Create Order",
                error:error.message,
            })
        }

    }
}

const getOrderByUserId = async(req,res)=>{
    const {userId}= req.params;
    try {
        const orders =await Order.find({user:userId})
        .populate("user","name email")
        .populate("items.product","name price")
        .sort({createdAt:-1})

        if(!order || order.length === 0){
            return res.status(404).json({
                success:false,
                message:"order not found for the user",
            })
        }
    } catch (error) {
          res.status(500).json({
                success:false,
                message:"failed to Create Order",
                error:error.message,
            })
    }
}
export {createTransection ,getOrderByUserId ,createOrder}