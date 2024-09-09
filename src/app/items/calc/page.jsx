'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './calc.module.css'

export default function CalcPage () {
  const [isLoading, setIsLoading] = useState(true)
  const [japitems, setJapitems] = useState([]) // 로컬 스토리지에서 사용할 japitems 데이터
  const [barcodeInput, setBarcodeInput] = useState('')
  const [cartItems, setCartItems] = useState([])
  const barcodeInputRef = useRef(null)

  // 로컬 스토리지에서 japitems 불러오기
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
      barcodeInputRef.current.focus() // 페이지 로딩 시 바코드 입력창에 포커스
    }
  }, [isLoading])

  // 바코드를 통해 아이템 검색 후 수량을 업데이트
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

    setBarcodeInput('') // 바코드 입력란 초기화
    barcodeInputRef.current.focus() // 아이템 추가 후 다시 바코드 입력창에 포커스
  }

  // 수량을 수동으로 업데이트
  const handleQuantityChange = (code, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.code === code ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // 총 가격 계산
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

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
              onKeyPress={e => e.key === 'Enter' && handleBarcodeInput()} // Enter 키를 누르면 바코드 처리
              className={styles.barcodeInput}
              ref={barcodeInputRef}
            />
            <button onClick={handleBarcodeInput} className={styles.btn}>
              Add Item
            </button>
          </div>

          {/* 장바구니에 추가된 아이템 리스트 */}
          <div className={styles.cartContainer}>
            {cartItems.length === 0 ? (
              <p>No items added yet</p>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div key={index} className={styles.cartItem}>
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
                      />
                    </p>
                    <p>Subtotal: {item.price * item.quantity} 원</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* 총 가격 */}
          <div className={styles.totalContainer}>
            <h2>Total Price: {calculateTotalPrice()} 원</h2>
          </div>
        </div>
      )}
    </div>
  )
}
