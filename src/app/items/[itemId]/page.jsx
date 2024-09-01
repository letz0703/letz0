'use client' // Next.js 13+에서 클라이언트 컴포넌트로 선언
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ItemDetail ({ params }) {
  const { itemId } = useParams() // URL에서 itemId를 가져옵니다.
  const [item, setItem] = useState(null)

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옵니다.
    const localJapitemsString = localStorage.getItem('japitems')
    if (!localJapitemsString) {
      console.log('No items found in local storage.')
      return
    }
    let localJapitems
    try {
      localJapitems = JSON.parse(localJapitemsString)
    } catch (error) {
      console.error('Error parsing local storage data:', error)
      return
    }

    // itemId와 일치하는 데이터를 찾습니다 (문자열 비교)
    const foundItem = localJapitems.find(item => String(item.id) === itemId)

    if (foundItem) {
      setItem(foundItem)
    } else {
      console.log(`Item with id ${itemId} not found in local storage.`)
    }
  }, [itemId])

  if (!item) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Item ID: {item.id}</h1>
      <p>Name: {item.name}</p>
      <p>Price: {item.price}</p>
      <p>English Name: {item.enName}</p>
      <p>Description: {item.description}</p>
    </>
  )
}

//"use client";

//import { useSearchParams } from 'next/navigation';

//export default function ItemDetail() {
//  const searchParams = useSearchParams();
//  const [itemId, name, price, enName, description] = ['itemId', 'name', 'price', 'enName', 'description'].map(param => searchParams.get(param));

//  if (!itemId) {
//    return <p>Loading...</p>;
//  }

//  return (
//    <>
//      <h1>Item ID: {itemId}</h1>
//      <p>Name: {name}</p>
//      <p>Price: {price}</p>
//      <p>English Name: {enName}</p>
//      <p>Description: {description}</p>
//    </>
//  );
//}
