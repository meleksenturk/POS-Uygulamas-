import { Modal, Form, Input, Select, Card, Button, message } from "antd"
import { useSelector, useDispatch } from "react-redux"
import {reset} from "../../redux/cartSlice"
import { useNavigate } from "react-router-dom"
const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
          const res = await fetch("http://localhost:5000/api/bills/add-bill", {
            method: "POST",
            body: JSON.stringify({
              ...values,
              subTotal: cart.total,
              tax: ((cart.total * cart.tax) / 100).toFixed(2),
              totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
              cartItems: cart.cartItems,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
    
          if (res.status === 200) {
            message.success("Fatura başarıyla oluşturuldu.");
            dispatch(reset());
            navigate("/bills");
          }
        } catch (error) {
          message.danger("Bir şeyler yanlış gitti.");
          console.log(error);
        }
      };
    
    return (

        <Modal title="Fatura Oluştur" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Müşteri Adı" name={"customerName"} rules={[
                    {
                        required:true,
                        message:"Müşteri adı zorunlu!"
                    }
                ]}>
                    <Input placeholder="Bir isim girniz." />

                </Form.Item>

                <Form.Item label="Telefon Numarası" name={"customerPhoneNumber"} rules={[
                    {
                        required:true,
                        message: "Telefon Numarası zorunlu!"
                    }
                ]}>
                    <Input placeholder="Bir telefon numarası giriniz." />
                </Form.Item>

                <Form.Item label="Ödeme Yöntemi" name={"paymentMode"} rules={[
                    {
                        required:true,
                        message:"Ödeme yöntemi zorunlu!"
                    }
                ]}>
                    <Select placeholder="Ödeme yöntemi seçiniz.">
                        <Select.Option value="Nakit">Nakit</Select.Option>
                        <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
                    </Select>
                </Form.Item>

                <Card className=''>
                    <div className='flex justify-between'>
                        <span>Ara Toplam</span>
                        <span>{cart.total}₺</span>
                    </div>
                    <div className='flex justify-between py-3'>
                        <span>KDV %8</span>
                        <span className='text-red-600'>{(cart.total *cart.tax)/100}₺</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-green-400'>Genel Toplam</span>
                        <span className='tex-green-400'>{cart.total + (cart.total *cart.tax)/100}₺</span>
                    </div>

                    <div className="flex justify-end">
                        <Button type="primary" className='mt-3' htmlType="submit" size="large" onClick={() => setIsModalOpen(true) }
                        disabled={cart.cartItems.length === 0}
                       >Sipariş Oluştur</Button>
                    </div>
                </Card>


            </Form>


        </Modal>


    )
}

export default CreateBill