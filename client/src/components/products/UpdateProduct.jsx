import React from 'react'
import { Modal, Form, Input, Button, message} from "antd"
const UpdateProduct = ({ isAddModalOpen, setIsAddModalOpen, products, setProducts, editingItem}) => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({...values, productId:editingItem._id}),
                headers: { "Content-type": "application/json ; charset=UTF-8" }
            })
            message.success("Ürün başarıyla güncellendi.")
            form.resetFields();
            setProducts(
                products.map((item) => {
                if(item._id === editingItem._id){
                    return values;
                }
                return item;
            }))
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <Modal title="Ürün Güncelle" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)}
            footer={false}>
            <Form layout='vertical' onFinish={onFinish} form={form} >
                <Form.Item name="title" label="Ürün Adı"
                    rules={[{ required: true, message: "Ürün adı boş geçilemez" }]}>
                    <Input placeholder='Bir Ürün adı giriniz.' />
                </Form.Item>
                <Form.Item name="img" label="Ürün Görseli"
                    rules={[{ required: true, message: "Ürün görsel alanı boş geçilemez" }]}>
                    <Input placeholder='Ürün görseli ekleyiniz.' />
                </Form.Item>
                <Form.Item name="price" label="Ürün Fiyatı"
                    rules={[{ required: true, message: "Fiyat  boş geçilemez" }]}>
                    <Input placeholder='Ürün fiyatı giriniz.' />
                </Form.Item>
                <Form.Item name="category" label="Kategori seç" rules={[{ required: true, message: "Kategori  boş geçilemez" }]}>
                    <Input placeholder='Kategori seç.'/>
                </Form.Item>
                <Form.Item className='flex justify-end mb-0' >
                    <Button type="primary" htmlType="submit" >Güncelle</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default UpdateProduct