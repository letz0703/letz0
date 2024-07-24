"use client"

import { useEffect, useState, useCallback } from "react";
import { database } from "@/api/firebase";
import { get, ref } from "firebase/database";
import styles from './page.module.css'; // CSS 파일을 임포트

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [japitems, setJapitems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJapitems, setFilteredJapitems] = useState([]);

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
        japitems.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300),
    [japitems]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.gridContainer}>
            {filteredJapitems.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <a href={item.homeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={`/images/${item.imgs}`} alt={item.name} className={styles.itemImage} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.enName}</p> {/* 영문 타이틀 추가 */}
                  <p>{item.description}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
