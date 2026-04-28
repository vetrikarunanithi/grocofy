import React, { useContext } from 'react'
import './FreshDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FreshItem from '../FreshItem/FreshItem'

const FreshDisplay = ({category}) => {

    const { fresh_list } = useContext(StoreContext)

  return (
    <div className='fresh-display' id='fresh-display'>
        <h2>Top </h2>
        <div className="fresh-display-list">
            {fresh_list.map((item, index)=>{
                if(category==="All" || category===item.category){
                    return <FreshItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                }
            })}
        </div>
    </div>
  )
}

export default FreshDisplay
