import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    getProductsAsync,
    selectProducts, createProductAsync, getCategoriesAsync, selectProduct,
} from './productSlice';
import styles from './Product.module.css';

export function Products() {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(getProductsAsync())}
        >
         Get Products
        </button>
          <button
              className={styles.asyncButton}
              onClick={() => dispatch(getCategoriesAsync())}
          >
              Get Categories
          </button>
          <button
              className={styles.asyncButton}
              onClick={() => dispatch(selectProduct(products[0]))}
          >
              SELECT FIRST PRODUCT
          </button>
        <button
            className={styles.asyncButton}
            onClick={() => dispatch(createProductAsync({
              name: "MacBook Pro 256 GB",
              avatar: "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/apple/thumb/114761-1_large.jpg",
              developerEmail: "tryone!@gmail.com",
              price: 1000,
              description: "Awesome product from Apple",
              category: "Electronic"
            }))}
        >
          Create Product
        </button>
      </div>
    </div>
  );
}
