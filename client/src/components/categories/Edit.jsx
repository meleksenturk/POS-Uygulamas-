import React, { useState } from 'react'
import {Modal,Form, Table, Input, Button, message} from "antd"
const Edit = ({isEditModalOpen, setIsEditModalOpen, categories ,setCategories}) => {
  const [editingRow, setEditingRow] = useState({});

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/categories/update-category",{
                method : "PUT",
                body: JSON.stringify({...values,categoryId:editingRow._id}),
                headers:{"Content-type": "application/json ; charset=UTF-8"}
            });
            message.success("Kategori başarıyla güncellendi.")
            setCategories(categories.map((item) => {
                if(item._id === editingRow._id){
                    return{...item, title: values.title}
                }
                return item;
            }))
        } catch (error) {
            console.log(error)
            
        }

    } //update sıkıntılı

    const deleteCategory = (id) => {
        if(window.confirm("Emin misiniz?")){
            try {
                fetch("http://localhost:5000/api/categories/delete-category",{
                    method:"DELETE",
                    body:JSON.stringify({categoryId:id}),
                    headers:{"Content-type": "application/json; charset=UTF-8"}
                })
                message.success("Kategori başarıyla silindi.")
                setCategories(categories.filter((item) => item._id !== id))
            } catch (error) {
                message.error("Bişeyler yanlış gitti.")
                console.log(error)
                
            }
        }
    }

  const columns = [
    {
        title: "Category Title",
        dataIndex : "title",
        render: (_, record) => {
            console.log(editingRow)
            console.log(record)
            if(record._id === editingRow._id){
                return(
                    <Form className='mb-0'>
                        <Input defaultValue={record.title}/>
                    </Form>
                )
            } else{
                return <p>{record.title}</p>
            }
        }
    },
    {
        title: "Action",
        dataIndex: "action",
        render: (_,record) => {
            return(
                <div>
                    <Button type="link" onClick={() => setEditingRow(record)} >Düzenle</Button>
                    <Button type="link" htmlType="submit">Kaydet</Button>
                    <Button type="link" danger onClick={() => deleteCategory(record._id)}>Sil</Button>
                </div>
            )
        }
    }
  ]

  return (
    <Modal open={isEditModalOpen} title="Kategori İşlemleri"
    footer={false} onCancel={() => setIsEditModalOpen(false)}>
        <Form onFinish={onFinish}>
            <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} ></Table>
        </Form>
    </Modal>
  )
}

export default Edit