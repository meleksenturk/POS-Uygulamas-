import { message } from "antd";
import {useDispatch} from "react-redux"
import {addProduct} from "../../redux/cartSlice"
export const ProductsItem = ({item}) => {
  

    // const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct({...item, quantity:1}));
        message.success("Ürün Sepete Eklendi.")
    }
    return (
        <>
            <div className="product-item border hover:shadow-lg cursor-pointer transation-all select-none"
            onClick={handleClick}>
                <div className="product-img">
                    <img src={item.img}
                        alt="" className="h-28 object-cover w-full border-b">

                    </img>
                </div>
                <div className="product-info flex flex-col p-3">
                    <span className="font-bold">{item.title}</span>
                    <span>{item.price}₺</span>
                </div>
            </div>
        </>
    )
}
