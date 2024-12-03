import React, { useEffect, useState } from 'react';

const TopProductsTable = () => {
  const [products, setProducts] = useState([]);

  const tableOptions = {
    styles: {
      container: "bg-base-200 rounded-lg shadow p-6",
      title: "text-2xl font-bold mb-6",
      table: "w-full text-left table-auto",
      headerRow: "border-b",
      headerCell: "py-2",
      row: "border-b",
      cell: "py-4",
      progressBar: {
        container: "w-full bg-gray-200 rounded-full h-2.5",
        bar: "h-2.5 rounded-full",
      },
      salesText: "text-sm font-semibold"
    },
    colors: {
      high: '#3b82f6',
      medium: '#10b981',
      low: '#a855f7'
    },
    thresholds: {
      high: 50,
      medium: 30
    }
  };

  const getBarColor = (value) => {
    const { high, medium } = tableOptions.thresholds;
    const { colors } = tableOptions;
    return value > high ? colors.high : value > medium ? colors.medium : colors.low;
  };

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const mockData = [
          { _id: 1, name: "Product A", popularity: 75, sales: 80 },
          { _id: 2, name: "Product B", popularity: 45, sales: 35 },
          { _id: 3, name: "Product C", popularity: 25, sales: 20 }
        ];
        setProducts(mockData);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className={tableOptions.styles.container}>
      <h2 className={tableOptions.styles.title}>Top Products</h2>
      <table className={tableOptions.styles.table}>
        <thead>
          <tr className={tableOptions.styles.headerRow}>
            <th className={tableOptions.styles.headerCell}>#</th>
            <th className={tableOptions.styles.headerCell}>Name</th>
            <th className={tableOptions.styles.headerCell}>Popularity</th>
            <th className={tableOptions.styles.headerCell}>Sales</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className={tableOptions.styles.row}>
              <td className={tableOptions.styles.cell}>
                {String(index + 1).padStart(2, '0')}
              </td>
              <td className={tableOptions.styles.cell}>{product.name}</td>
              <td className={tableOptions.styles.cell}>
                <div className={tableOptions.styles.progressBar.container}>
                  <div
                    className={tableOptions.styles.progressBar.bar}
                    style={{
                      width: `${product.popularity}%`,
                      backgroundColor: getBarColor(product.popularity)
                    }}
                  />
                </div>
              </td>
              <td className={`${tableOptions.styles.cell} text-right`}>
                <span
                  className={`${tableOptions.styles.salesText} ${
                    product.sales > tableOptions.thresholds.high
                      ? 'text-blue-500'
                      : product.sales > tableOptions.thresholds.medium
                      ? 'text-green-500'
                      : 'text-purple-500'
                  }`}
                >
                  {product.sales}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;