'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { database } from '../../api/firebase';
import { get, ref } from 'firebase/database';
import styles from './page.module.css';
import Image from 'next/image';

// debounce를 안정적인 함수로 정의
function useDebounce(callback, delay) {
  const debounceRef = useRef(null);

  return useCallback(
    (...args) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [japitems, setJapitems] = useState([]); // 전체 데이터
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [filteredJapitems, setFilteredJapitems] = useState([]); // 필터링된 데이터
  const searchInputRef = useRef(null); // 검색 입력창 ref

  // Firebase에서 데이터 가져오기
  async function getRemoteJapitems() {
    try {
      setIsLoading(true);
      const snapshot = await get(ref(database, 'japitems'));
      if (snapshot.exists()) {
        const remoteJapitems = Object.values(snapshot.val());
        setJapitems(remoteJapitems);
        setFilteredJapitems(remoteJapitems); // 초기 상태 설정
        localStorage.setItem('japitems', JSON.stringify(remoteJapitems));
      } else {
        console.warn('No data found in Firebase.');
        setJapitems([]);
        setFilteredJapitems([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    const localJapitems = localStorage.getItem('japitems');
    if (localJapitems) {
      const items = JSON.parse(localJapitems);
      setJapitems(items);
      setFilteredJapitems(items);
      setIsLoading(false);
    } else {
      getRemoteJapitems();
    }
  }, []);

  // 검색 로직
  const handleSearch = useDebounce(
    useCallback(
      (term) => {
        const lowerTerm = term.toLowerCase().trim();
        if (!lowerTerm) {
          setFilteredJapitems(japitems);
          return;
        }

        const filtered = japitems.filter((item) => {
          return (
            (typeof item.name === 'string' &&
              item.name.toLowerCase().includes(lowerTerm)) ||
            (typeof item.description === 'string' &&
              item.description.toLowerCase().includes(lowerTerm)) ||
            (typeof item.enName === 'string' &&
              item.enName.toLowerCase().includes(lowerTerm)) ||
            (typeof item.price === 'number' &&
              item.price.toString().includes(lowerTerm)) ||
            (item.barcode && item.barcode.toString().includes(lowerTerm))
          );
        });

        setFilteredJapitems(filtered);
      },
      [japitems] // japitems에만 의존
    ),
    300
  );


  // 검색어 변경 시 필터링 실행
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, japitems]); // japitems가 업데이트될 때도 필터링 실행

  // URL에서 검색어 가져오기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam); // 검색어 상태 업데이트
  }, []);

  // 페이지 로드 시 검색 입력창에 focus
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // 검색 결과 리셋
  const resetSearch = () => {
    setSearchTerm(''); // 검색어 초기화
    setFilteredJapitems(japitems); // 전체 데이터 표시
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // 검색 입력창에 포커스
    }
  };

  return (
    <div className={styles.pageContainer}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className={`${styles.searchContainer} mt-10 mb-10 relative`}>
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
            <div className='relative w-full'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${styles.searchInput} mt-10 mb-10 pl-10 pr-12`}
                ref={searchInputRef}
              />
              <button
                onClick={resetSearch}
                className='absolute top-1/2 right-6 transform -translate-y-1/2 bg-red-600 rounded-full px-3 py-5 text-sm text-white'
              >
                reset
              </button>
            </div>
          </div>
          <div className={styles.gridContainer}>
            {filteredJapitems.map((item, index) => (
              <div
                key={`${index}-${searchTerm}`}
                className={styles.itemCard}
                onClick={() => window.open(`/items/${item.id}`, '_blank')}
                style={{ cursor: 'pointer' }}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
