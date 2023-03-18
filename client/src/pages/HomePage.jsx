import { useEffect, useState } from "react";
import CartTotal from "../components/cart/CartTotal";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header"
import Products from "../components/products/Products";
import {Spin} from "antd"
const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState()
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("")
  useEffect(() => {
    const getCategoires = async() => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all")
        const data = await res.json()
        data && setCategories(data.map((item) => {
          return {...item, value:item.title, label:item.title}
        }))
        console.log(data)
        setCategories(data)
      } catch (error) {
        console.log(error)
        
      }
    }
    getCategoires();
  },[categories])
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
}, [products])

  return (
    <>
      <Header setSearch={setSearch}></Header>
      {categories && products ? (<div className="home px-6 flex flex-col md:flex-row justify-between  gap-10 md:pb-0 pb-24 ">
        <div className="categories overflow-auto max-h-[calc(100vh_-_118px)] md:pb-10">
          <Categories categories = {categories} setCategories={setCategories} setFiltered={setFiltered} products={products}/>
        </div>
        <div className="products flex-[8] overflow-y-auto max-h-[calc(100vh_-_118px)] md:pb-10 min-h-[500px]">
          <Products categories= {categories}  products={products} filtered={filtered} setProducts={products}
          search={search}/>
        </div>
        <div className="cart-wrapper  min-w-[300px] md:-mr-[24px] md:-mt-[24px]  border-l ">
          <CartTotal/>
        </div>
      </div>) : <Spin size="large" className="absolute top-1/3 left-1/2"></Spin>}
    </>
  )
}

export default HomePage