"use client"
import { useEffect, useState } from 'react'
import './App.css'
import { getPropertiesFromAPI } from './services/property_service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [properties, setProperties] = useState<{
    id: number,
    name: string;
    address: string;
    price: string;
    propertyType: string;
    imageUrl: string;
  }[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const getProperties = async () => {
    setLoading(true)
    try {
      const { error, data } = await getPropertiesFromAPI(page)
      if (!error) {
        const { properties, totalPages, totalItems } = data
        setProperties(properties)
        setTotalPages(totalPages)
        setTotalItems(totalItems)
      } else {
        toast.error("An error occurred, please try again later")
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("An error occurred, please try again later")
      setLoading(false)
    }
  }
  useEffect(() => {
    getProperties()
  }, [page])

  return (
    <div id='base'>
      <div className='flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold mb-2'>Properties Near You!</h2>
        <Button title='Refresh' onClick={getProperties} />
      </div>
      <p className='text-center'>Showing {properties.length} out of {totalItems} properties</p>
      {loading ? <p className='text-center'>Loading..</p>
        : <>
          {properties.length > 0
            ? <>
              {properties.map((p) => {
                return (
                  <div key={p.id} className='bg-BACKGROUND text-FOREGROUND overflow-hidden rounded-md mb-1 border border-FOREGROUND flex flex-row items-stretch'>
                    <img src={p.imageUrl} alt="" className='w-20 sm:w-32 md:w-48' />
                    <div className='flex flex-1 flex-col justify-between text-left p-2 py-1'>
                      <div className='flex flex-col'>
                        <h5 className='font-bold text-base sm:text-lg'>{p.name}</h5>
                        <p className='text-xs sm:text-sm'>{p.address}</p>
                      </div>
                      <div className='flex flex-row justify-between'>
                        <p className={`' rounded-md text-sm p-0.5 px-3 text-BACKGROUND ${p.propertyType == 'House' ? 'bg-ACCENT' : 'bg-SECONDARY'} w-min'`}>{p.propertyType}</p>
                        <p className='block md:hidden font-bold text-right'>{p.price}</p>
                      </div>
                    </div>
                    <p className='hidden md:block ml-auto p-2 self-center text-2xl font-bold text-right'>{p.price}</p>
                  </div>)
              })}</>
            : <p className='text-center'>no properties found</p>
          }</>}
      <div className="flex flex-row justify-between items-center font-bold">
        {page > 1 ? <Button title="PREVIOUS" onClick={() => setPage(val => --val)} /> : <div></div>}
        Page {page}/{totalPages}
        {page < totalPages ? <Button title='NEXT' onClick={() => setPage(val => ++val)} /> : <div></div>}
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}


const Button = (props: { onClick: () => void, title: string }) => (
  <button className='bg-ACCENT font-bold min-w-6 p-0.5 px-1 rounded-md m-2' onClick={props.onClick}>{props.title}</button>
)

export default App