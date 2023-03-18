import {  useState } from "react"
import { ProductsItem } from "./ProductsItem"
import {PlusOutlined, EditOutlined} from "@ant-design/icons"
import Add from "./Add"
import { useNavigate } from "react-router-dom"


const Products = ({products, categories, filtered, setProducts,search}) => {
    


    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate()
   
    
   
    return (
        <div className="products-wrapper grid grid-cols-card gap-4"  >
            {filtered.filter((product) => product.title.toLowerCase().includes(search)).map((item) => (
                <ProductsItem item={item} key={item._id}/>
            ))}
            <div className="product-item flex justify-center items-center opacity-100 bg-purple-800 border
            hover:shadow-lg cursor-pointer transation-all select-none min-h-[180px] " onClick={() => setIsAddModalOpen(true)}>
                <PlusOutlined className="text-white md:text-2xl hover:text-4xl"/>
            </div>
            <div className="product-item flex justify-center items-center opacity-100 bg-orange-800 border hover:shadow-lg 
            min-h-[180px] cursor-pointer transation-all select-none" onClick={() =>navigate("/products") } >
                <EditOutlined className="text-white md:text-2xl hover:text-4xl"/>
            </div>
            <Add setIsAddModalOpen={setIsAddModalOpen} isAddModalOpen={isAddModalOpen} products={products} setProducts={setProducts} categories={categories}/>
        </div>

        

    )
}

export default Products