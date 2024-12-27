'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { database } from "../../api/firebase"
import { get, ref } from 'firebase/database'
import styles from './page.module.css'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

// debounce를 안정적인 함수로 정의
function useDebounce(callback, delay) {
  const debounceRef = useRef(null);

  return useCallback((...args) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [japitems, setJapitems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJapitems, setFilteredJapitems] = useState([]);
  const searchInputRef = useRef(null);

  async function getRemoteJapitems() {
    await get(ref(database, 'japitems'))
      .then(snapshot => {
        if (snapshot.exists()) {
          const remoteJapitems = Object.values(snapshot.val());
          setJapitems(remoteJapitems);
          localStorage.setItem('japitems', JSON.stringify(remoteJapitems));
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    const localJapitems = localStorage.getItem('japitems');
    if (localJapitems) {
      setJapitems(JSON.parse(localJapitems));
      setIsLoading(false);
    } else {
      getRemoteJapitems();
    }
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // debounce를 적용한 handleSearch 정의
  const handleSearch = useDebounce((searchTerm) => {
    const term = searchTerm.toLowerCase();
    const filtered = japitems.filter(item => {
      return (
        (typeof item.name === "string" && item.name.toLowerCase().includes(term)) ||
        (typeof item.description === "string" && item.description.toLowerCase().includes(term)) ||
        (typeof item.enName === "string" && item.enName.toLowerCase().includes(term)) ||
        (typeof item.price === "number" && item.price.toString().includes(term)) ||
        (typeof item.barcode === "string" && item.barcode.toString().includes(term))
      );

    });
    setFilteredJapitems(filtered);

    // Update URL with search parameters
    const params = new URLSearchParams({ search: searchTerm });
    router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div className={styles.pageContainer}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className={`${styles.searchContainer} mt-10 mb-10`}>
            <span className={styles.searchIcon}>
              <Image
                src='/images/search-48.png'
                alt='Search Icon'
                width={30}
                height={30}
                priority
                className={styles.searchIconImage}
              />
            </span>
            <input
              type='text'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`${styles.searchInput} mt-10 mb-10 pl-10`}
              ref={searchInputRef}
            />
          </div>
          <div className={styles.gridContainer}>
            {filteredJapitems.map((item, index) => (
              <div key={`${index}-${searchTerm}`} className={styles.itemCard}>
                <Link
                  href={{
                    pathname: `/items/${item.id}`
                  }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Image
                    src={`/images/${item.imgs || 'default.jpg'}`}
                    alt={item.name}
                    className={styles.itemImage}
                    width={500}
                    height={500}
                  />
                  <p>{item.barcode}</p>
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
