"use client"

import { useEffect, useState, useCallback, useRef } from "react";
import { database } from "@/api/firebase";
import { get, ref } from "firebase/database";
import styles from './test.module.css'; // CSS 파일을 임포트
import Link from "next/link";
import SearchForm from "./searchForm";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [japitems, setJapitems] = useState([]);
  const [filteredJapitems, setFilteredJapitems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null); // 검색 입력창의 ref

  async function getRemoteJapitems() {
    await get(ref(database, 'japitems'))
      .then(snapshot => {
        if (snapshot.exists()) {
          const remoteJapitems = Object.values(snapshot.val());
          setJapitems(remoteJapitems);
          localStorage.setItem("japitems", JSON.stringify(remoteJapitems));
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    const localJapitems = localStorage.getItem("japitems");
    if (localJapitems) {
      setJapitems(JSON.parse(localJapitems));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    getRemoteJapitems();
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
      setFilteredJapitems(
        japitems.filter(item => {
          const term = searchTerm.toLowerCase();
          return (
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.enName.toLowerCase().includes(term) ||
            item.price.toString().includes(term)
          );
        })
      );
    }, 300),
    [japitems]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);
  console.log(filteredJapitems);


  return (
    <div className={styles.pageContainer}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
					<SearchForm itemId={filteredJapitems.id} query={searchTerm}/>
          <div className={styles.gridContainer}>
            {filteredJapitems.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <Link
                  href={{
                    pathname:`/items/${item.id}`
                    ,
                    query: { itemId:item.id, name: item.name, price:item.price, enName:item.enName, description:item.description}
                  }}
                //href={item.homeUrl}
                //target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={`/images/${item.imgs}`} alt={item.name} className={styles.itemImage} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.enName}</p>
                  <p>{item.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
