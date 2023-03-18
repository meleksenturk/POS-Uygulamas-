import React, {useState} from 'react'
import { Button, Form, Input, Carousel, message } from "antd"
import { Link } from "react-router-dom"
import AuthCarousel from '../../components/auth/AuthCarousel'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onFinish = async (values) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });
            if(res.status === 200){
                message.success("Kayıt işlemi başarılı.")
                navigate("/login")
                loading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-screen'>
            <div className='flex justify-between h-full'>
                <div className='md:px-20 px-10 w-full flex flex-col h-full justify-center relative'>
                    <h1 className='text-center text-5xl font-bold mb-2'>LOGO</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label="Kullanıcı adı"
                            name={"username"}
                            rules={[
                                {
                                    required: true,
                                    message: "Bu alan zorunlu",
                                },
                            ]}>
                            <Input />

                        </Form.Item>
                        <Form.Item label="E-mail"
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Bu alan zorunlu",
                                },
                            ]}>
                            <Input />

                        </Form.Item>
                        <Form.Item label="Şifre"
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Bu alan zorunlu",
                                },
                            ]}>
                            <Input.Password />

                        </Form.Item>
                        <Form.Item label="Şifre Tekrar"
                            name={"passwordAgain"}
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Bu alan zorunlu",
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value){
                                        if(!value || getFieldValue("password") === value){
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "The two passwords that you entered do not match!"
                                            )
                                        );
                                    }
                                })
                            ]}>
                            <Input.Password />

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='w-full' size="large">Kaydol</Button>
                        </Form.Item>
                    </Form>
                    <div className='flex justify-center absolute left-0 bottom-10 w-full '>
                        Bir hesabınız mı var? &nbsp; <Link to="/login"><span className='text-blue-600 font-bold text-m'>Şimdi giriş yap</span></Link>
                    </div>
                </div>
                <div className=' xl:w-[900px] w-[300px] md:flex hidden bg-[#6c63ff]'>
                    <div className='w-full h-full flex items-center'>
                        <div className='w-full'>
                            <Carousel className='!h-full px-6' autoplay>
                                <AuthCarousel img="images/responsive.svg"title="Responsive" desc="Tüm Cihaz Boyutlarıyla uyumluluk"/>
                                <AuthCarousel img="images/statistic.svg" title="İstatistikler" desc="Geniş Tutulan İstatistikler"/>
                                <AuthCarousel img="images/customer.svg" title="Müşteri memnuniyeti" desc="Deneyim Sonunda Üründen Memnun Müşteriler"/>
                                <AuthCarousel img="images/admin.svg" title="Yönetim Paneli" desc="Tek Yerden Yönetim"/>
                                
                        
                            </Carousel>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Register