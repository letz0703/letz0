"use client";

import { useRef } from "react";
import styles from './test.module.css';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//export default function SearchForm({ setSearchTerm }) { // Receive setSearchTerm as a prop
export default function SearchForm({setSearchTerm, userOptions }) { // Receive setSearchTerm as a prop
  const searchInputRef = useRef(null); // 검색 입력창의 ref
  const itemRef = useRef(null); // 검색 입력창의 ref
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const itemId = searchParams.get("itemId") || "";
  const router = useRouter();
  const pathName = usePathname();

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('query', searchInputRef.current?.value || "");
    params.set('itemId', itemRef.current?.value || "");
    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.searchContainer} mt-10 mb-10`}> {/* Tailwind CSS로 상하 마진 추가 */}
          <span className={styles.searchIcon}>
            <img src="/images/search-48.png" alt="Search Icon" className={styles.searchIconImage} />
          </span>
          <input
            type="text"
            placeholder="Price Info"
            defaultValue={query} // Use query from URL as default value
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state in the parent
            className={`${styles.searchInput} mt-10 mb-10 pl-10`} // Tailwind CSS로 상하 마진 추가 및 좌측 패딩 추가
            ref={searchInputRef} // ref 연결
          />
        </div>
      </form>
    </div>
  );
}
