// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import { useEffect } from 'react'
// import axios from "axios"
// import { assets } from '../../assets/assets'

// const Orders = ({url}) => {

//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     const response = await axios.get(url+"/api/order/list");
//     if (response.data.success) {
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }
//     else{
//       toast.error("Error")
//     }
//   }

//   const statusHandler = async (event, orderId) => {
//     const response = await axios.post(url+"/api/order/status", {
//       orderId,
//       status:event.target.value
//     })
//     if (response.data.success) {
//       await fetchAllOrders();
//     }
    
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   },[])

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => (
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className="order-item-fresh">
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length-1) {
//                     return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + " , "
//                   }
//                 })}
//               </p>
//               <p className="order-item-name">
//                 {order.address.firstName+ " " + order.address.lastName}
//               </p>
//               <div className="order-item-address">
//                 <p>{order.address.street + " , "}</p>
//                 <p>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.zipcode}</p>
//               </div>
//               <p className="order-item-phone">{order.address.phone}</p>
//             </div>
//             <p>Items: {order.items.length}</p>
//             <p>₹{order.amount}</p>
//             <select onChange={(EVENT)=>statusHandler(event, order._id)} value={order.status}>
//               <option value="Order Processing">Order Processing</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders
import React, { useState, useEffect } from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
import axios from "axios"
import { assets } from '../../assets/assets'

// Package Icon
const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// Phone Icon
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// User Icon
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// MapPin Icon
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error loading orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Management</h3>
      {loading ? (
        <div className="order-loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="order-empty">
          No orders yet. Orders will appear here once customers start placing them.
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-icon">
                <PackageIcon />
              </div>
              
              <div className="order-details">
                <div className="order-items-list">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " × " + item.quantity
                    } else {
                      return item.name + " × " + item.quantity + ", "
                    }
                  })}
                </div>
                
                <div className="order-customer">
                  <UserIcon />
                  <span>{order.address.firstName + " " + order.address.lastName}</span>
                </div>
                
                <div className="order-address">
                  <MapPinIcon />
                  <div>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                  </div>
                </div>
                
                <div className="order-phone">
                  <PhoneIcon />
                  <span>{order.address.phone}</span>
                </div>
              </div>

              <div className="order-meta">
                <div className="order-count">
                  <span className="meta-label">Items</span>
                  <span className="meta-value">{order.items.length}</span>
                </div>
                <div className="order-amount">
                  <span className="meta-label">Amount</span>
                  <span className="meta-value">Rs {order.amount}</span>
                </div>
              </div>

              <div className="order-status-wrapper">
                <label htmlFor={`status-${order._id}`}>Status</label>
                <select 
                  id={`status-${order._id}`}
                  onChange={(event) => statusHandler(event, order._id)} 
                  value={order.status}
                  className={`status-select status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <option value="Order Processing">Order Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders