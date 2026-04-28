import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreGroceries from "../../components/ExploreGroceries/ExploreGroceries";
import FreshDisplay from "../../components/FreshDisplay/FreshDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreGroceries category={category} setCategory={setCategory} />
      <FreshDisplay category={category} />
    </div>
  );
};

export default Home;
