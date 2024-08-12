"use client"

import { useEffect, useState, useCallback, useRef } from "react";
import { database } from "@/api/firebase";
import { get, ref } from "firebase/database";
import styles from './Page.module.css'; // CSS 파일을 임포트

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLists, setFilteredLists] = useState([]);
  const searchInputRef = useRef(null); // 검색 입력창의 ref

  async function getRemoteLists() {
    await get(ref(database, 'lists'))
      .then(snapshot => {
        if (snapshot.exists()) {
          const remoteLists = Object.values(snapshot.val());
          setLists(remoteLists);
          localStorage.setItem("lists", JSON.stringify(remoteLists));
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    const localLists= localStorage.getItem("lists");
    if (localLists) {
      setLists(JSON.parse(localLists));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    getRemoteLists();
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // 페이지 로딩 시 검색 입력창에 포커스
    }
  }, []);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      setFilteredLists(
        lists.filter(item => {
          const term = searchTerm.toLowerCase();
          return (
            item.name.toLowerCase().includes(term) ||
            item.eName.toLowerCase().includes(term) ||
            item.cat.toLowerCase().includes(term)
          );
        })
      );
    }, 300),
    [lists]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div className={styles.pageContainer}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className={`${styles.searchContainer} mt-10 mb-10`}> {/* Tailwind CSS로 상하 마진 추가 */}
            <span className={styles.searchIcon}>
              <img src="/images/search-48.png" alt="Search Icon" className={styles.searchIconImage} />
            </span>
            <input
              type="text"
              placeholder=" letz search especial lists"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${styles.searchInput} mt-10 mb-10 pl-10`} // Tailwind CSS로 상하 마진 추가 및 좌측 패딩 추가
              ref={searchInputRef} // ref 연결
            />
          </div>
          <div className={styles.gridContainer}>
            {filteredLists.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <a href={item.homeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/*<img src={`/images/${item.imgs}`} alt={item.name} className={styles.itemImage} />*/}
                  <p>{item.name}</p>
                  <p>{item.eName}</p>
                  <p><a href={item.home}>wiki</a></p>
                  <p><a href={item.arc}>arc</a></p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
