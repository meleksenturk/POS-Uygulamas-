import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header'
import StatisticCard from '../components/statistic/StatisticCard'
import { Area, Pie } from '@ant-design/plots';
import {Spin} from "antd"
const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([])
  const user = JSON.parse(localStorage.getItem("posUser"))
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch("http://localhost:5000/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
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
}, [])
  const config = {
    data,
    xField: 'customerName',
    yField: 'subTotal',
    xAxis: {
      range: [0, 1],
    },
  };
  
  const config2 = {
    appendPadding: 10,
    data,
    angleField: 'subTotal',
    colorField: 'customerName',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Toplam\nDeğer',
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total,item) => item.totalAmount + total, 0)
    return `${amount.toFixed(2)} ₺`
  }

  return (
    <>
      <Header />
      {data ? (<div className=' px-6 md:pb-0 pb-20' >
        <h1 className='text-3xl font-bold text-center mb-4'>İSTATİSTİKLERİM</h1>
        <div className='statistic-section' onScroll={{x:1000}}>
          <h2 className='text-lg'>
            Hoşgeldin <span className='font-bold text-green-700 tex-xl'>{user.username}</span>
          </h2>
          <div className='statistic-cards grid xl:grid-cols-4 md:grid-cols-2  my-10 md:gap-10 gap-4'>

            <StatisticCard title={"Toplam Müşteri"} amount={data?.length} img={"images/user.png"} />
            <StatisticCard title={"Toplam Kazanç"} amount={totalAmount()} img={"images/money.png"} />
            <StatisticCard title={"Toplam Satış"} amount={data?.length} img={"images/sale.png"} />
            <StatisticCard title={"Ürün Toplamı"} amount={products.length} img={"images/product.png"} />

          </div>
          <div className='flex justify-between gap-10 lg:flex-row flex-col  item-center mb-50 '  >
            <div className='md:w-1/2 md:h-72 h-72' >
              <Area {...config}  />
            </div>
            <div className='md:w-1/2 md:h-72 h-72'>
              <Pie {...config2} />
            </div>

          </div>
        



        </div>

      </div>) : <Spin size="large" className="absolute top-1/3 left-1/2"></Spin>}
    </>
  )
}

export default StatisticPage