export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchableContent />
      </Suspense>
    </div>
  );
}

function SearchableContent() {
  const searchParams = useSearchParams(); // Suspense 안에서 사용
  const itemId = searchParams.get("itemId") || "";
  const query = searchParams.get("query") || "";

  // 나머지 코드 ...
  return (
    <div>
      <SearchForm userOptions="null" setSearchTerm={setSearchTerm} />
      <div className={styles.gridContainer}>
        {filteredJapitems.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            <Link
              href={{
                pathname: `/items/${item.id}`,
                query: {
                  itemId: item.id,
                  name: item.name,
                  price: item.price,
                  enName: item.enName,
                  description: item.description,
                },
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={`/images/${item.imgs}`}
                alt={item.name}
                className={styles.itemImage}
              />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.enName}</p>
              <p>{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
