import { useEffect, useState } from 'react';
import { getTopProducts } from '../services/api';

const TopProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const data = await getTopProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Top Products</h2>
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b">
            <th className="py-2">#</th>
            <th className="py-2">Name</th>
            <th className="py-2">Popularity</th>
            <th className="py-2">Sales</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id} className="border-b">
              <td className="py-4">{String(index + 1).padStart(2, '0')}</td>
              <td className="py-4">{product.name}</td>
              <td className="py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${product.popularity}%`,
                      backgroundColor:
                        product.popularity > 50
                          ? '#3b82f6'
                          : product.popularity > 30
                          ? '#10b981'
                          : '#a855f7'
                    }}
                  ></div>
                </div>
              </td>
              <td className="py-4 text-right">
                <span
                  className={`text-sm font-semibold ${
                    product.sales > 50
                      ? 'text-blue-500'
                      : product.sales > 30
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
