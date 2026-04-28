import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

// Plus Icon
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// List Icon
const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

// Shopping Bag Icon
const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <div className="sidebar-icon">
            <PlusIcon />
          </div>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <div className="sidebar-icon">
            <ListIcon />
          </div>
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <div className="sidebar-icon">
            <ShoppingBagIcon />
          </div>
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar