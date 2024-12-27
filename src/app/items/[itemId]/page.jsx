'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ItemDetail() {
  const { itemId } = useParams() // URL에서 itemId를 가져옵니다.
  const router = useRouter() // 리다이렉션 제어를 위해 사용
  const [item, setItem] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    const localJapitemsString = localStorage.getItem('japitems')
    if (!localJapitemsString) {
      console.log('No items found in local storage.')
      setError('No items found in local storage.')
      return
    }

    let localJapitems
    try {
      localJapitems = JSON.parse(localJapitemsString)
    } catch (error) {
      console.error('Error parsing local storage data:', error)
      setError('Error parsing local storage data.')
      return
    }

    // itemId와 일치하는 데이터를 찾습니다 (문자열 비교)
    const foundItem = localJapitems.find(item => String(item.id) === String(itemId))

    if (foundItem) {
      setItem(foundItem)
    } else {
      console.log(`Item with id ${itemId} not found in local storage.`)
      setError(`Item with id ${itemId} not found.`)
    }
  }, [itemId])

  // 에러가 발생했을 때 처리
  useEffect(() => {
    if (error) {
      console.log('Error detected:', error)
      // 필요에 따라 리다이렉션 처리 (예: 홈으로 이동)
      router.push('/')
    }
  }, [error, router])

  if (error) {
    return <p>{error}</p>
  }

  if (!item) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Item Details</h1>
      <h2>Item ID: {item.id}</h2>
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Price:</strong> {item.price} KRW</p>
      <p><strong>English Name:</strong> {item.enName}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Barcode:</strong> {item.barcode}</p>
      {item.comment && (
        <p>
          <strong>Comment:</strong>{' '}
          <a
            href={item.comment}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'blue' }}
          >
            Visit Link
          </a>
        </p>
      )}
    </div>
  )
}
