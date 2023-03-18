import React, {useEffect, useState} from 'react'
import "./style.css"
import Add from "./Add"
import {PlusOutlined,EditOutlined} from "@ant-design/icons"
import Edit from './Edit'
const Categories = ({categories,setCategories,products,setFiltered}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü")

  useEffect(() => {
    console.log(categoryTitle)
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <ul className='flex gap-4 flex-row md:flex-col text-lg'>
        {categories.map((item) => (
          
          <li className='category-items' key={item._id} onClick={() => setCategoryTitle(item.title)}>
            <span>{item.title}</span>
          </li>
        ))}
        
        <li className='category-items !bg-purple-800 hover:opacity-90' onClick={() => setIsAddModalOpen(true)}>
          <PlusOutlined className ="md:3xl" />
        </li>
        <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} setCategories={setCategories} categories={categories}/>
        <li className='category-items !bg-orange-800 hover:opacity-90' onClick={() => setIsEditModalOpen(true)}>
          <EditOutlined className ="md:3xl" />
        </li>
        <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} categories={categories} setCategories={setCategories}/>
    </ul>
  )
}

export default Categories