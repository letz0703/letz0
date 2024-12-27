'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './calc.module.css';

export default function CalcPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [japitems, setJapitems] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    try {
      const localJapitems = JSON.parse(localStorage.getItem('japitems')) || [];
      if (Array.isArray(localJapitems)) {
        setJapitems(localJapitems);
      } else {
        throw new Error('Invalid data in localStorage');
      }
    } catch (error) {
      alert('No valid japitems found in local storage!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBarcodeInput = (e) => {
    const inputValue = e.target.value.trim();
    setBarcodeInput(inputValue);

    if (!inputValue) {
      setFilteredItems([]);
      return;
    }

    // 정확히 바코드와 일치하는 항목 찾기
  const exactMatch = japitems.find(item => item.code === inputValue);
  if (exactMatch) {
    setFilteredItems([exactMatch]); // 정확히 일치하는 항목만 표시
    return;
  }
    const matchedItems = japitems.filter(item =>
      item.code.toString().includes(inputValue)
    );

    setFilteredItems(matchedItems);
  };

  const handleAddItem = () => {
    if (filteredItems.length > 0) {
      handleItemClick(filteredItems[0]);
    } else {
      alert('Item not found!');
    }
  };

  const handleItemClick = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.code === item.code);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.code === item.code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    setBarcodeInput('');
    setFilteredItems([]);
  };

  const handleDeleteItem = (code) => {
    setCartItems(prevItems => prevItems.filter(item => item.code !== code));
  };

  const handleQuantityChange = (code, newQuantity) => {
    if (newQuantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.code === code
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div>
        <div className={styles.searchContainer}>
          <input
            type='text'
            placeholder='Scan or type barcode'
            value={barcodeInput}
            onChange={handleBarcodeInput}
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
            className={styles.barcodeInput}
            ref={barcodeInputRef}
          />
          <button onClick={handleAddItem} className={styles.btn}>
            Add Item
          </button>
        </div>

        {filteredItems.length > 0 && (
          <div className={styles.filteredItemsContainer}>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleItemClick(item)}
              >
                {item.name} ({item.code})
              </div>
            ))}
          </div>
        )}

        <div className={styles.cartContainer}>
          {cartItems.length === 0 ? (
            <p>No items added yet</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <p>{item.name}</p>
                  <p>Price: {item.price} 원</p>
                  <p>
                    Quantity:
                    <input
                      type='number'
                      value={item.quantity}
                      min='1'
                      onChange={e => handleQuantityChange(item.code, Number(e.target.value))}
                      className={styles.quantityInput}
                    />
                  </p>
                  <p>Subtotal: {Number(item.price) * item.quantity} 원</p>
                </div>
                <button onClick={() => handleDeleteItem(item.code)} className={styles.btnDelete}>
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className={styles.totalContainer}>
          <h2>Total Price: {calculateTotalPrice()} 원</h2>
        </div>
      </div>
    </div>
  );
}
