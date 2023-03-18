import React, {useEffect, useState} from 'react'
import {Table,  Button} from "antd"
import Header from '../components/header/Header';
import PrintBill from '../components/bills/PrintBill';
import {Spin} from "antd"
const BillPage = () => {
    const [billItems, setBillItems] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customer, setCustomer] = useState();
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
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render:(text) => {
                return <span>{text.substring(0,10)}</span>
            }
        },
        {
            title: 'Ödeme Yöntemi',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
            
        },
        {
            title: 'Toplam Fiyat',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render:(text) => {
                return <span>{text}₺ </span>
            }
            
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render:(_,record) => {
                return <Button type="link" onClick={() => {
                    setIsModalOpen(true)
                    setCustomer(record)
                }}>Yazdır</Button>
            }
            
        },
    ];


    return (
        <>
            <Header />
            {billItems ? (<div className='px-6'>
                <Table dataSource={billItems} columns={columns} className="bordered" pagination={false} scroll={{x:1000, y:300}}/>
                

            </div>): <Spin size="large" className="absolute top-1/3 left-1/2"></Spin>}
            <PrintBill isModalOpen={isModalOpen} 
            customer={customer}
            setIsModalOpen={setIsModalOpen}/>

        </>
    )
  
}

export default BillPage