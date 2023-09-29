// import react dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import apollo dependency
import { useQuery } from "@apollo/client";

// import utils dependencies
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { categories, currentCategory } = state; // Add currentCategory from state
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // if categoryData, loading, or dispatch is updated, update category
  useEffect(() => {
    // retrieved from server
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // update current category when button is clicked
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  // Clear the current category
  const clearCategory = () => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: null,
    });
  };

  return (
    <div>
      {/* <h2>Models:</h2> */}
      <button onClick={clearCategory}>All</button>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
          className={currentCategory === item._id ? "selected" : ""}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
