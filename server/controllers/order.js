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
    const genrate_signature = crypto.createHmac('sha256',key_secret).update(razorpay_order_id+"|"razorpay_payment_id).digest('hex')
    if(generate_signature === razorpay_signature){
        try {
            
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"failed to Create Order",
                error:error.message,
            })
        }
    }
}
export {createTransection}