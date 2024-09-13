'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './calc.module.css'

export default function CalcPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [japitems, setJapitems] = useState([])
  const [barcodeInput, setBarcodeInput] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [receivedAmount, setReceivedAmount] = useState(0) // 기본값 0원으로 설정
  const [filteredItems, setFilteredItems] = useState([]); // 필터링된 아이템 상태 추가
  const [selectedDate, setSelectedDate] = useState('')
  const [history, setHistory] = useState([])
  const barcodeInputRef = useRef(null)
  const receivedAmountRef = useRef(null) // 수령액 필드에 대한 ref

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

  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus()
    }
  }, [isLoading])

  const handleBarcodeInput = (e) => {
    const inputValue = e.target.value;
    setBarcodeInput(inputValue);

    const matchedItems = japitems.filter(item =>
      item.code.toString().includes(inputValue)
    );

    setFilteredItems(matchedItems);

    if (inputValue === '') {
      setFilteredItems([]); // 입력값이 없으면 리스트 초기화
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

    setBarcodeInput(''); // 선택 후 입력창 초기화
    setFilteredItems([]); // 선택 후 검색 결과 초기화
  };

  const handleQuantityChange = (code, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.code === code ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleDeleteItem = (code) => {
    setCartItems(prevItems => prevItems.filter(item => item.code !== code))
  }

  const handleResetCart = () => {
    setCartItems([])
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // 결제 완료 시 기록 저장 (receivedAmount와 change 제거)
  const saveToLocalStorage = () => {
    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]

    const savedData = {
      date: formattedDate,
      cartItems,
      totalPrice: calculateTotalPrice(),
    }

    const existingData = JSON.parse(localStorage.getItem('calced')) || []
    const updatedData = [...existingData, savedData]
    localStorage.setItem('calced', JSON.stringify(updatedData))

    alert('Calculation saved successfully!')
    setCartItems([])
    setReceivedAmount(0) // 수령액 초기화
  }

  const loadHistory = (date) => {
    const existingData = JSON.parse(localStorage.getItem('calced')) || []
    const filteredData = existingData.filter(item => item.date === date)
    setHistory(filteredData)
  }

  // 수령액 필드에 대한 핸들러
  const handleReceivedAmountChange = (e) => {
    const newAmount = Math.max(0, Math.floor(e.target.value / 10000) * 10000)
    setReceivedAmount(newAmount)
  }

  const calculateChange = () => {
    return receivedAmount - calculateTotalPrice()
  }

  useEffect(() => {
    if (selectedDate) {
      loadHistory(selectedDate)
    }
  }, [selectedDate])

  return (
    <div className={styles.pageContainer}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className={styles.searchContainer}>
            <input
              type='text'
              placeholder='Scan or type barcode'
              value={barcodeInput}
              onChange={handleBarcodeInput} // 필터링된 리스트 업데이트
              onKeyPress={e => e.key === 'Enter' && handleBarcodeInput()}
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
                    onClick={() => handleItemClick(item)} // 클릭 시 선택된 아이템 추가
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
              <>
                {cartItems.map((item, index) => (
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
                          onChange={e =>
                            handleQuantityChange(item.code, Number(e.target.value))
                          }
                          className={styles.quantityInput}
                        />
                      </p>
                      <p>Subtotal: {item.price * item.quantity} 원</p>
                    </div>
                    <button onClick={() => handleDeleteItem(item.code)} className={styles.btnDelete}>
                      ❌
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className={styles.totalContainer}>
            <h2>Total Price: {calculateTotalPrice()} 원</h2>
          </div>

          <div className={styles.receivedContainer}>
            <h3>Received Amount (10,000 단위):</h3>
            <input
              type="number"
              value={receivedAmount}
              onChange={handleReceivedAmountChange} // 수령액 조정 핸들러
              className={styles.receivedInput}
              placeholder="Enter received amount"
              ref={receivedAmountRef}
              step="10000" // 10,000원 단위로 증가
            />
            {/* 받은 금액이 있을 때만 메시지를 표시 */}
            {receivedAmount > 0 && (
              <p
                style={{
                  color: calculateChange() < 0 ? 'red' : 'black',
                }}
              >
                {calculateChange() < 0
                  ? `Change: ${calculateChange()} 원 - 돈을 더 받아야 합니다.`
                  : `Change: ${calculateChange()} 원 - 거스름 돈`}
              </p>
            )}
          </div>

          {cartItems.length > 0 && (
            <button onClick={handleResetCart} className={styles.btnReset}>
              Reset All Items
            </button>
          )}

          {cartItems.length > 0 && (
            <button onClick={saveToLocalStorage} className={styles.btn}>
              Save and Complete Payment
            </button>
          )}

          <div className={styles.historyContainer}>
            <h3>Check Payment History by Date</h3>
            <input
              type='date'
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className={styles.dateInput}
            />

            {history.length === 0 ? (
              <p>No data found for the selected date.</p>
            ) : (
              <div className={styles.historyCards}>
                {history.map((entry, index) => (
                  <div key={index} className={styles.historyCard}>
                    <h4>{entry.date}</h4>
                    <div className={styles.cardItems}>
                      {entry.cartItems.map((item, idx) => (
                        <div key={idx} className={styles.cardItem}>
                          <p>{item.name}</p>
                          <p>Price: {item.price} 원</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Subtotal: {item.price * item.quantity} 원</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cardTotal}>
                      <p>Total Price: {entry.totalPrice} 원</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
