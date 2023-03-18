import React from 'react'
import { Button, message } from 'antd'
import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, increase, decrease, reset } from '../../redux/cartSlice';
import {useNavigate} from "react-router-dom"
const CartTotal = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col '>

            <h2 className='font-bold text-white p-6 bg-blue-600 text-center py-4 tracking-wide'>Sepetteki Ürünler</h2>


            <ul className='cart-items px-2 flex flex-col gap-y-3 pt-2'>
                {cart.cartItems.map((item) => (
                    <li className="cart-item flex justify-between cursor-pointer"  key={item._id}  >
                        <div className='flex items-center'>
                            <img src={item.img}
                                alt="" className='w-24 h-20 object-cover' onClick={() => dispatch(deleteProduct(item))}/>
                            <div className='flex flex-col ml-4 '>
                                <b>{item.title}</b>
                                <span>{item.price} x {item.quantity}</span>
                            </div>
                            <div className='flex justify-between items-center ml-12'>
                                <Button type="primary" size="small" className='w-full !rounded-full flex items-center justify-center '
                                    onClick={() => dispatch(increase(item)) } icon={<PlusCircleOutlined />}></Button>
                                <span className='text-bold text-lg px-2'>{item.quantity}</span>
                                <Button type="primary" size="small" className='w-full !rounded-full flex items-center justify-center' 
                                onClick={() => {
                                if(item.quantity === 1){
                                    if(window.confirm("Ürün silinsin mi?")){
                                        dispatch(decrease(item))
                                        message.success("Ürün sepetten silindi.")
                                    }
                                }
                                if(item.quantity > 1){
                                    dispatch(decrease(item))
                                }
                                }
                                }
                                 icon={<MinusCircleOutlined />}></Button>
                            </div>

                        </div>
                    </li>
                ))}

            </ul>
            <div className='cart-totals mt-auto '>
                <div className='border-t border-b'>
                    <div className='flex justify-between p-2'>
                        <b>Ara Toplam</b>
                        <span>{cart.total}</span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b>{cart.tax}</b>
                        <span className='text-red-700'>{(cart.total *cart.tax)/100}₺</span>
                    </div>
                </div>
                <div className='border-b mt-4'>
                    <div className='flex justify-between p-2'>
                        <b className='text-xl text-green-500'>Genel Toplam</b>
                        <span className='text-xl'>{cart.total + (cart.total *cart.tax)/100}₺</span>
                    </div>

                </div>
                <div className='py-2 px-2'>
                    <Button 
                    disabled={cart.cartItems.length === 0}
                    type="primary" size="large" className='w-full 'onClick={() => navigate("/cart")}>Sipariş Oluştur</Button>

                </div>
                <div className=' px-2'>
                    <Button type="primary" size="large" danger icon={<ClearOutlined />} className="w-full mt-2 flex items-center justify-center "
                   disabled={cart.cartItems.length === 0}
                   onClick={() => {
                        if(window.confirm("Emin Misiniz?")){
                            dispatch(reset());

                            message.success("Sepet Temizlendi..")
                        }
                    }
                    
                    }
                    >Temizle</Button>

                </div>

            </div>
        </div>
    )
}

export default CartTotal