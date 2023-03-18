import React, {useState,useEffect} from 'react'
import Header from '../components/header/Header'
import { Table,  } from "antd"

const CustomerPage = () => {
    const [billItems, setBillItems] = useState()

    useEffect(() => {
        const getBills = async() => {
          try {
            const res = await fetch("http://localhost:5000/api/bills/get-all")
            const data = await res.json()
            
            setBillItems(data)
          } catch (error) {
            console.log(error)
            
          }
        }
        getBills();
      },[])
    

    const columns = [
        {
            title: 'Müşteri Adı',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Telefon Numarası',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
        },
        {
            title: 'İşlem Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render:(text) => {
                return <span>{text.substring(0,10)}</span>
            }
        },
    ];


    return (
        <>
            <Header />
            <div className='px-6'  >
                <Table dataSource={billItems} columns={columns} className="bordered" pagination={false} scroll={{x:1000, y:500}} />
                <div className='cart-total flex justify-end mt-4' >
                

                </div>

            </div>
            

        </>
    )
}
export default CustomerPage