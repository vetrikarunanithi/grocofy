// import React from 'react'
// import './MyOrders.css'
// import { useState } from 'react'
// import { useContext } from 'react'
// import { StoreContext } from '../../context/StoreContext'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { assets } from '../../assets/assets'

// const MyOrders = () => {

//     const {url, token} = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = async () => {
//         const response = await axios.post(url+"/api/order/userorders", {}, {headers:{token}});
//         setData(response.data.data);
//     }

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token])

//   return (
//     <div className='my-orders'>
//         <h2>My Orders</h2>
//         <div className="container">
//             {data.map((order, index) => {
//                 return (
//                     <div key={index} className="my-orders-order">
//                         <img src={assets.parcel_icon} alt="" />
//                         <p>{order.items.map((item, index) => {
//                             if (index === order.items.length-1) {
//                                 return item.name+" x "+item.quantity
//                             }
//                             else{
//                                 return item.name+" x "+item.quantity+" , "
//                             } 
//                         })}</p>
//                         <p>₹{order.amount}.00</p>
//                         <p>Items: {order.items.length}</p>
//                         <p><span>&#x25cf;</span> <b>{order.status}</b></p>
//                         <button onClick={fetchOrders}>Track Order</button>
//                     </div>
//                 )
//             })}
//         </div>
//     </div>
//   )
// }

// export default MyOrders

import React, { useState, useContext, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

// Package Icon
const PackageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// Truck Icon
const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const MyOrders = () => {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.post(url + "/api/order/userorders", {}, {headers: {token}});
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    const getStatusClass = (status) => {
        if (status === "Delivered") return "status-delivered";
        if (status === "Out for Delivery") return "status-delivery";
        return "status-processing";
    }

  return (
    <div className='my-orders'>
        <div className="my-orders-header">
            <h2>My Orders</h2>
            <p className="my-orders-subtitle">Track and manage your orders</p>
        </div>
        
        {loading ? (
            <div className="my-orders-loading">Loading your orders...</div>
        ) : data.length === 0 ? (
            <div className="my-orders-empty">
                <PackageIcon />
                <p>No orders yet</p>
                <span>Start shopping to see your orders here</span>
            </div>
        ) : (
            <div className="my-orders-container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-card">
                            <div className="order-icon">
                                <PackageIcon />
                            </div>
                            
                            <div className="order-details">
                                <div className="order-items">
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " × " + item.quantity
                                        } else {
                                            return item.name + " × " + item.quantity + ", "
                                        } 
                                    })}
                                </div>
                                
                                <div className="order-meta">
                                    <span className="order-amount">Rs {order.amount}</span>
                                    <span className="order-count">{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
                                </div>
                            </div>

                            <div className={`order-status ${getStatusClass(order.status)}`}>
                                <div className="status-indicator"></div>
                                <span>{order.status}</span>
                            </div>

                            <button className="track-button" onClick={fetchOrders}>
                                <TruckIcon />
                                <span>Track Order</span>
                            </button>
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default MyOrders
