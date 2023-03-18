import React from 'react'
import { Modal, Form, Input, Button, message} from "antd"
const Add = ({ isAddModalOpen, setIsAddModalOpen, products, setProducts,categories}) => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json ; charset=UTF-8" }
            })
            message.success("Ürün başarıyla eklendi.")
            form.resetFields();
            setProducts([...products, {
                _id: Math.random,
                img:values.img,
                price: Number(values.price),
                category:values.category
            }])
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <Modal title="Basic Modal" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)}
            footer={false}>
            <Form layout='vertical' onFinish={onFinish} form={form} >
                <Form.Item name="title" label="Yeni Ürün Ekle"
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
                    <Button type="primary" htmlType="submit"  >Oluştur</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default Add