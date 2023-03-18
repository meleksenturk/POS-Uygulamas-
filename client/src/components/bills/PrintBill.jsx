import { Modal,Button } from "antd"
import {useRef} from "react"
import { useReactToPrint } from "react-to-print";
const PrintBill = ({ isModalOpen, setIsModalOpen,customer }) => {
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (

        <Modal title="Fatura Yazdır" open={isModalOpen}
            footer={false} onCancel={() => setIsModalOpen(false)}
            width={800}
        >
            <section className="py-20 bg-black"ref={componentRef} >
                <div className="max-w-5xl mx-auto bg-white px-6">
                    <article className="overflow-hidden">
                        <div className="logo my-6">
                            <h2 className="text-4xl font-bold text text-slate-700">LOGO</h2>
                        </div>
                        <div className="bill-details">
                            <div className="grid sm:grid-cols-4 grid-cols-3">
                                <div className="text-md text-slate-500">
                                    <p className="font-bold text-slate-700">Fatura Detayı</p>
                                    <p>{customer?.customerName}</p>
                                    <p>Fake Street</p>
                                    <p>San Javier</p>
                                    <p>CA 1234</p>
                                </div>
                                <div className="text-md text-slate-500">
                                    <p className="font-bold text-slate-700">Fatura</p>
                                    <p>The Boring Company</p>
                                    <p>Tesla street 007</p>
                                    <p>Frissco</p>
                                    <p>CA 0000</p>
                                </div>
                                <div className="text-md text-slate-500">
                                    <div>
                                        <p className="font-bold text-slate-700">Fatura Numarası</p>
                                        <p>000{Math.floor(Math.random()*100)}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 mt-2">Veriliş Tarihi</p>
                                        <p>{customer?.createdAt.substring(0,10)}</p>
                                    </div>
                                </div>
                                <div className="text-md text-slate-500 sm:block hidden">
                                    <div>
                                        <p className="font-bold text-slate-700">Şartlar</p>
                                        <p>10 gün</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 mt-2">Vade</p>
                                        <p>22-02-2022</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="table-area mt-8">
                            <table className="min-w-full divide-y divide-slate-500" >
                                <thead>
                                    <tr className="border-b  border-slate-200">
                                        <th scope="col" className="py-3  text-left text-sm font-normal text-slate-700
                                        sm:pl-6 md:pl-0 sm:table-cell hidden">Görsel</th>

                                        <th scope="col" className="py-3  text-left text-sm font-normal text-slate-700
                                        ">Başlık</th>

                                        <th scope="col" className="py-3 pl-1 text-left text-sm font-normal text-slate-700
                                        sm:pl-6 md:pl-0 sm:table-cell hidden">Fiyat</th>
                                        <th scope="col" className="py-3 pl-1 text-left text-sm font-normal text-slate-700
                                        sm:pl-6 md:pl-0 sm:table-cell hidden">Adet</th>
                                        <th scope="col" className="py-3 pl-1 text-left text-sm font-normal text-slate-700
                                        sm:pl-6 md:pl-0 ">Toplam</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {customer?.cartItems.map((item) => (
                                        <tr className="border-b border-t">
                                        <td className="py-4 sm:table-cell hidden ">
                                            <img src={item.img}
                                                className="w-12 h-12 object-cover" alt=""/>
                                        </td>
                                        <td className="py-4 ">
                                            <span className="font-medium ">{item.title}</span>
                                        </td>
                                        <td className="py-4 sm:table-cell hidden ">
                                            <span >{item.price.toFixed(2)}₺</span>
                                        </td>
                                        <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                                            <span >{item.quantity}</span>
                                        </td>
                                        <td className="py-4 sm:table-cell hidden ">
                                            <span >{(item.price * item.quantity).toFixed(2)}</span>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                <tfoot >
                                    <tr>
                                        
                                        <th className="text-left pt-4 sm:hidden" colSpan={4} scope="row">
                                            <span className="font-normal text-slate-700">Ara Toplam</span>
                                        </th>
                                        <th className="text-right pt-6" colSpan={4} scope="row">
                                            <span className="font-normal text-slate-700">{customer?.subTotal}₺</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right pt-6" colSpan={4} scope="row">
                                            <span className="font-normal text-slate-700">KDV</span>
                                        </th>
                                        <th className="text-right pt-6" colSpan={4} scope="row">
                                            <span className="font-normal text-red-600">+{customer?.tax}₺</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right pt-6" colSpan={4} scope="row">
                                            <span className="font-normal text-slate-700">Total</span>
                                        </th>
                                        <th className="text-right pt-6" colSpan={4} scope="row">
                                            <span className="font-normal text-slate-700">{customer?.totalAmount}₺</span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="mt-10 mb-10">
                                <div className="border-t pt-9 border-slate-200">
                                <p className="text-sm font-light text-slate-700">
                                    Ödeme koşulları 14 gündür. Paketlenmemiş borçlalrın ge. ödemesi yasası 0000'a göre, serbest çalışanların
                                    bu süreden sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti talep etme hakkına sahip 
                                    olduklarını ve bu noktada bu ücrete ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                                </p>

                                </div>
                            </div>

                        </div>
                    </article>

                </div>

            </section>
            <div className="flex justify-end mt-4">
                <Button type="primary" size="large" onClick={handlePrint} >Yazdır</Button>

            </div>


        </Modal>


    )
}

export default PrintBill