'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './calc.module.css'

export default function CalcPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [japitems, setJapitems] = useState([])
  const [barcodeInput, setBarcodeInput] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [receivedAmount, setReceivedAmount] = useState(0) // 기본값 0원으로 설정
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

  const handleBarcodeInput = () => {
    const foundItem = japitems.find(item => item.code.toString() === barcodeInput.toString())

    if (foundItem) {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.code === foundItem.code)
        if (existingItem) {
          return prevItems.map(item =>
            item.code === foundItem.code
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          return [...prevItems, { ...foundItem, quantity: 1 }]
        }
      })
    } else {
      alert('Item not found!')
    }

    setBarcodeInput('')
    barcodeInputRef.current.focus()
  }

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
              onChange={e => setBarcodeInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleBarcodeInput()}
              className={styles.barcodeInput}
              ref={barcodeInputRef}
            />
            <button onClick={handleBarcodeInput} className={styles.btn}>
              Add Item
            </button>
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
            {/* 거스름돈이 음수일 경우 빨간색, 그렇지 않으면 기본 색상 */}
            <p
              style={{
                color: calculateChange() < 0 ? 'red' : 'black',
              }}
            >
              Change: {calculateChange()} 원
            </p>
            {/* 돈을 더 받아야 하는 경우 문구 표시 */}
            {calculateChange() < 0 && (
              <p style={{ color: 'red' }}>돈을 더 받아야 합니다.</p>
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
