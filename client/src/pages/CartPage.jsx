import React, {useState} from 'react'
import Header from '../components/header/Header'
import { Table, Card, Button,message, Popconfirm } from "antd"
import CreateBill from '../components/cart/CreateBill';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease,deleteProduct} from '../redux/cartSlice';
import {  PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Ürün Görseli',
            dataIndex: 'img',
            key: 'img',
            width:"125px",
            render:(text) => {
                return(<img src={text} alt="" className='w-full h-20 object-cover'/>)
            }
        },
        {
            title: 'Ürün Adı',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: "Ürün Fiyatı",
            dataIndex:"price",
            key:"price",
            render:(text,record) => {
                <div className='flex justify-between items-center ml-12'>
                                <Button type="primary" size="small" className='w-full !rounded-full flex items-center justify-center '
                                    onClick={() => dispatch(increase(record)) } icon={<PlusCircleOutlined />}></Button>
                                <span className='text-bold text-lg px-2'>{record.quantity}</span>
                                <Button type="primary" size="small" className='w-full !rounded-full flex items-center justify-center' 
                                onClick={() => {
                                if(text.quantity === 1){
                                    if(window.confirm("Ürün silinsin mi?")){
                                        dispatch(decrease(record))
                                        message.success("Ürün sepetten silindi.")
                                    }
                                }
                                if(record.quantity > 1){
                                    dispatch(decrease(record))
                                }
                                }
                                }
                                 icon={<MinusCircleOutlined />}></Button>
                            </div>
            }
        },
        {
            title: "Ürün Adedi",
            dataIndex:"quantity",
            key:"quantity",
            render:(text) => {
                <span>{text.toFixed(2)}</span>
            }
        },
        {
            title: "Toplam Fiyat",
            render:(text,record) => {
                return <span>{record.quantity * record.price}₺</span>
            }
        },
        {
            title:"Actions",
            render:(_, record) => {
                return (
                    <Popconfirm 
                    title="Emin Misiniz?"
                    onConfirm={() => {dispatch(deleteProduct(record));message.success("Silme başarılı")}}
                    okText="Evet"
                    cancelText="Hayır"
                    >
                        <Button type="link" danger>Sil</Button>
                    </Popconfirm>
                )
            }
        }
    ];


    return (
        <>
            <Header />
            <div className='px-6'>
                <Table dataSource={cart.cartItems} columns={columns} className="bordered" pagination={false} scroll={{x:1200,y:300}} />
                <div className='cart-total flex justify-end mt-4' >
                    <Card className='w-72 '>
                        <div className='flex justify-between'>
                            <span>Ara Toplam</span>
                            <span>{cart.total}₺</span>
                        </div>
                        <div className='flex justify-between py-3'>
                            <span>KDV %8:</span>
                            <span className='text-red-600'> {(cart.total *cart.tax)/100}₺</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-green-400'>Genel Toplam</span>
                            <span className='tex-green-400'>{cart.total + (cart.total *cart.tax)/100}₺</span>
                        </div>
                        
                        <Button type="primary" className='w-full mt-3' size="large" onClick={() => setIsModalOpen(true)}>Sipariş Oluştur</Button>
                        
                    </Card>

                </div>

            </div>
            <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

        </>
    )
}
export default CartPage