import { useEffect, useState } from 'react'
import axios from 'axios'
import "./style.css"

function LoadData() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [count, setCount] = useState(0)
    const [disablebtn, setDisablebtn] = useState(false)

    const LoadData = async () => {
        try {
          setLoading(true)
        const res = await axios.get(`https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`)
        const data = await res.data
        if(data && data.products && data.products.length > 0){
          setProducts((prevData) => [...prevData, ...data.products]);
          if(data.products.length < 20){
            setDisablebtn(true)
            setLoading(false);
          } else {
            setDisablebtn(false)
          }
          setLoading(false);
        }
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
    }

    useEffect(() => {
        LoadData()
    }, [count])
    
    useEffect(() => {
      if(products && products.length === 100){
        setDisablebtn(true)
    }}, [products])
    
    if(loading){
        return <h2>Loading...</h2>
    }

  return (
    <>
    <div className='load-more-container'>
        <div className="product-container">
          {
            products && products.length ? products.map((item: { id: number, thumbnail: string, title: string }) => (
              <div
              className='product'
              key={item.id}
              >
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
              </div>
            ))
            : <h2>No Products Found</h2>
          }
        </div>
        <div className="button-container">
          <button disabled={disablebtn} onClick={() => setCount(count+1)} >Load More Products</button>
          {
            disablebtn ? <h2>No More Products</h2> : null
          }
    </div>
    </div>
    </>
  )
}

export default LoadData