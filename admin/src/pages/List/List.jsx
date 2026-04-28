// import React, { useEffect, useState } from "react";
// import "./List.css";
// import axios from "axios";
// import { toast } from "react-toastify";

// const List = ({url}) => {

//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/product/list`);
//     if (response.data.success) {
//       setList(response.data.data);
//     } else {
//       toast.error("Error");
//     }
//   };

//   const removeProduct = async (productId)=> {
//     const response = await axios.post(`${url}/api/product/remove`,{id:productId});
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message)
//     }
//     else{
//       toast.error("Error")
//     }
//   }

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <p>All Products List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index)=>{
//           return (
//             <div key={index} className="list-table-format">
//               <img src={`${url}/images/`+item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{item.price}</p>
//               <p onClick={()=>removeProduct(item._id)} className="cursor">X</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   );
// };

// export default List;

import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

// Trash Icon Component
const TrashIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const List = ({url}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error loading products");
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await axios.post(`${url}/api/product/remove`, {id: productId});
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {loading ? (
          <div className="list-loading">Loading products...</div>
        ) : list.length === 0 ? (
          <div className="list-empty">No products found. Add your first product!</div>
        ) : (
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Rs {item.price}</p>
                <button 
                  onClick={() => removeProduct(item._id)} 
                  className="delete-btn"
                  title="Delete product"
                  aria-label="Delete product"
                >
                  <TrashIcon />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default List;