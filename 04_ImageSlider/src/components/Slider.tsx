import { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"
import './Slider.css'
 
const Slider = ({url, limit , page}) => {
  interface ImageItem {
    id: string;
    download_url: string;
    author: string;
  }

  const [images, setImages] = useState<ImageItem[]>([])
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [error , setError] = useState<string>('')
  const [loading , setLoading] = useState<boolean>(false)

  function handlePrev() {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1)
  }

  function handleNext() {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1)
  }


  async function fetchImages(url: string) {
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      if (data){
        setLoading(false)
        setImages(data)
      }
    } catch (error: unknown) {
      setLoading(false)
      setError((error as Error).message)
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(`${url}?${page}&limit=${limit}`)
  }, [url , limit , page])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='container'>
      <BsArrowLeftCircleFill onClick={handlePrev} className='arrow arrow-left' />
      {
        images && images.length ?
        images.map((imageitem, index) => (
          <img
          key={imageitem.id}
          src={imageitem.download_url}
          alt={imageitem.author}
          className={currentImage === index ? 'current-image' : 'current-image hide-current-image'}
          />
        ))
        : null
      }
      <BsArrowRightCircleFill onClick={handleNext} className='arrow arrow-right' />
      <span className='circle-indicators'>
        {
          images && images.length ?
          images.map((_,index)=> (
          <button
          key={index}
          className={
            currentImage === index ? 'current-indicator' : 'current-indicator inactive-indicator'
          }
            onClick={() => setCurrentImage(index)}
          >
          </button>
          ))
          : null
        }
      </span>
    </div>
  )
}

export default Slider