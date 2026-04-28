import React from "react";
import "./ExploreGroceries.css";
import { fresh_categories } from "../../assets/assets";

const ExploreGroceries = ({ category, setCategory }) => {
  return (
    <div className="explore-groceries" id="explore-groceries">
      <h1>Explore our groceries</h1>
      <p className="explore-groceries-text">Choose</p>

      <div className="explore-groceries-list">
        {fresh_categories.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-groceries-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreGroceries;
