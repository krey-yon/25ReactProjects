import { CiStar } from "react-icons/ci";
import { useState } from "react";
import './style.css';

const Rating = ({noOfStars = 5}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(getCurrentIndex : number) {
        setRating(getCurrentIndex);
    }

    function handleMouseMove(getCurrentIndex : number) {
        setHover(getCurrentIndex);
        
    }

    function handleMouseLeave() {
        setHover(rating);
        
    }

  return (
    <>
    <div className='star-rating'>
        {
            [...Array(noOfStars)].map((_, i) => {
                i++;
                return (
                    <CiStar
                    key={i}
                    className={i <= (hover || rating) ? 'star-rating-filled' : 'star-rating-empty'}
                    onClick={ () => handleClick(i)}
                    onMouseMove={ () => handleMouseMove(i)}
                    onMouseLeave={ () => handleMouseLeave()}
                    size={40}
                    />
                )
            })
        }
    </div>
    </>
  )
}

export default Rating