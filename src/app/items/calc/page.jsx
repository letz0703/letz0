'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import styles from './calc.module.css'

export default function CalcPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [japitems, setJapitems] = useState([])
  const [barcodeInput, setBarcodeInput] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [receivedAmount, setReceivedAmount] = useState(0)
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState('')
  const [history, setHistory] = useState([])
  const barcodeInputRef = useRef(null)

  useEffect(() => {
    const localJapitems = JSON.parse(localStorage.getItem('japitems'))
    if (localJapitems && Array.isArray(localJapitems)) {
      setJapitems(localJapitems)
      setIsLoading(false)
    } else {
      alert('No japitems found in local storage!')
      setIsLoading(false)
    }
  }, [])

  const handleBarcodeInput = (e) => {
    const inputValue = e.target.value;
    setBarcodeInput(inputValue);

    const matchedItems = japitems.filter(item =>
      item.code.toString().includes(inputValue)
    );

    setFilteredItems(matchedItems);

    if (inputValue === '') {
      setFilteredItems([]);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (filteredItems.length > 0) {
        handleItemClick(filteredItems[0]);
      } else {
        alert('Item not found!');
      }
    }
  };

  // 수량 변경 처리 함수
  const handleQuantityChange = (code, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.code === code
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // 총 금액 계산 함수
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  };

  return (
    <Suspense fallback={"loading..."}>
    <div className={styles.pageContainer}>
        <div>
          <div className={styles.searchContainer}>
            <input
              type='text'
              placeholder='Scan or type barcode'
              value={barcodeInput}
              onChange={handleBarcodeInput}
              onKeyPress={handleKeyPress}
              className={styles.barcodeInput}
              ref={barcodeInputRef}
            />
            <button onClick={handleBarcodeInput} className={styles.btn}>
              Add Item
            </button>
          </div>

          <div className={styles.filteredItemsContainer}>
            {filteredItems.length > 0 && (
              <div className={styles.suggestions}>
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
          </div>

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
