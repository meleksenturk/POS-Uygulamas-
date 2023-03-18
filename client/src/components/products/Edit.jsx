import React, { useState, useEffect } from 'react'
import {  Table, Button, message,  } from "antd"
import UpdateProduct from "./UpdateProduct"
const Edit = () => {
    const [products, setProducts] = useState([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const [editingItem, setEditingItem] = useState({})
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products/get-all")
                const data = await res.json()
                setProducts(data)
            } catch (error) {
                console.log(error)

            }
        }
        getProducts()
    }, [])



    const deleteProduct = (id) => {
        if (window.confirm("Emin misiniz?")) {
            try {
                fetch("http://localhost:5000/api/products/delete-product", {
                    method: "DELETE",
                    body: JSON.stringify({ productId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                message.success("Kategori başarıyla silindi.")
                setProducts(products.filter((item) => item._id !== id))
            } catch (error) {
                message.error("Bişeyler yanlış gitti.")
                console.log(error)

            }
        }
    }

    const columns = [

        {
            title: "Ürün Adı",
            dataIndex: "title",
            width : "8%",
            render: (_, record) => {
                return <p>{record.title}</p>
            }
        },
        {
            title: "Ürün Görseli",
            dataIndex: "img",
            width : "4%",
            render: (_, record) => {
                return <img src={record.img} alt="" className='w-full h-20 object-cover'/>

            }
        },
        {
            title: "Ürün Fiyatı",
            dataIndex: "price",
            width : "8%",
        },

        {
            title: "Kategori",
            dataIndex: "category",
            width : "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width : "15%",
            render: (_, record) => {
                return (
                    <div>
                        <Button type="link"   onClick={() => 
                            {
                                setIsAddModalOpen(true)
                                setEditingItem(record)
                            }
                            }>Düzenle</Button>
                        
                        <Button type="link" danger onClick={() => deleteProduct(record._id)}>Sil</Button>
                    </div>
                )
            }
        }
    ]

    return (
        <>
          
                <Table bordered dataSource={products} columns={columns} rowKey={"_id"} 
                scroll= {
                    {
                        x:1000,
                        y:600
                    }
                }
                
                >
                    
                </Table>
                <UpdateProduct isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}
                     products={products} setProducts={setProducts}
                     setEditingItem={setEditingItem} editingItem={editingItem} />
           
        </>


    )
}

export default Edit