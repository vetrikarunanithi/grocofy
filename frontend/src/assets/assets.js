import basket_icon from './basket_icon.png'
import logo1 from './logo1.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'

import menu_vegetables from './menu_vegetables.png'
import menu_beverages from './menu_beverages.png'
import menu_bakery from './menu_bakery.png'
import menu_combos from './menu_combos.png'
import menu_oils from './menu_oils.png'
import menu_snacks from './menu_snacks.png'
import menu_fruits from './menu_fruits.png'
import menu_coconut from './menu_coconut.png'

import product_1 from './coconut.png'
import product_2 from './red_coconut.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo1,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const fresh_categories = [
  { 
    menu_name: "Coconut",   
    menu_image: menu_coconut 
  },

  { menu_name: "Fruits",    
    menu_image: menu_fruits 
  },

  { 
    menu_name: "Vegetables",
    menu_image: menu_vegetables 
  },

  { 
    menu_name: "Beverages", 
    menu_image: menu_beverages 
  },

  { 
    menu_name: "Oils",      
    menu_image: menu_oils 
  },

  { 
    menu_name: "Snacks",    
    menu_image: menu_snacks 
  },

  { 
    menu_name: "Bakery",    
    menu_image: menu_bakery 
  },

  { 
    menu_name: "Combos",    
    menu_image: menu_combos 
  }
];


export const fresh_list = [
  // Coconut
  {
    _id: "1",
    name: "Tender Coconut (Green)",
    image: product_1,
    price: 18,
    description: "Hydrating tender coconut with natural electrolytes, handpicked daily for peak freshness.",
    category: "Coconut"
  },
  {
    _id: "2",
    name: "Mature Coconut (Brown)",
    image: product_2,
    price: 12,
    description: "Rich coconut meat perfect for cooking, grating, and traditional recipes.",
    category: "Coconut"
  }
];

