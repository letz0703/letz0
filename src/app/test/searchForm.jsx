"use client"

import {useRef, useState} from "react";
import styles from './test.module.css'
import {useRouter} from "next/navigation";

export default function SearchForm({itemId, query}){
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null); // 검색 입력창의 ref
	const router= useRouter()

	function handleSubmit(e){
			e.preventDefault()
			router.push("/")
	}
	return (
		<div>
			<form onSubmit={handleSubmit} >
			 <div className={`${styles.searchContainer} mt-10 mb-10`}> {/* Tailwind CSS로 상하 마진 추가 */}
            <span className={styles.searchIcon}>
              <img src="/images/search-48.png" alt="Search Icon" className={styles.searchIconImage} />
            </span>
            <input
              type="text"
              placeholder="Price Info"
              defaultValue={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${styles.searchInput} mt-10 mb-10 pl-10`} // Tailwind CSS로 상하 마진 추가 및 좌측 패딩 추가
              ref={searchInputRef} // ref 연결
            />
       </div>
			</form>
		</div>
	)
}