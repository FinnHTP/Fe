import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LabelList, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import NavbarAdminComponent from "../../component/NavbarAdmin.Component"; 

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#AF19FF', '#FF1919', '#FFAC19', '#FF5A19', 
  '#F219FF', '#19FF22', '#1919FF', '#1919FF'
];

function Chart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2023');
  
  const [data2, setData2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      loadChartData(selectedYear, token);
    } else {
      console.error("Token not found");
    }
  }, [selectedYear]);

  const loadChartData = async (year, token) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/data${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;

      if (responseData && typeof responseData === 'object') {
        const formattedData = Object.keys(responseData).map(key => ({
          name: key,
          value: responseData[key]
        }));

        setData(formattedData);
        setIsLoading(false);
      } else {
        console.error('Data format is incorrect');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadPieChartData = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/games/profit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData2 = response.data;

      if (responseData2 && typeof responseData2 === 'object') {
        const formattedData = Object.keys(responseData2).map(key => ({
          name: key,
          value: responseData2[key]
        }));

        setData2(formattedData);
        setIsLoading2(false);
      } else {
        console.error('Data format is incorrect');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(value)
      .replace('₫', 'VND');
  };

  const handleOpenModal = async () => {
    const token = localStorage.getItem("accesstoken");
    if (token && data2.length === 0) {
      await loadPieChartData(token);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <NavbarAdminComponent /> 
      </div>
      <div className="w-3/4 p-4">
       
        <div className="mb-4">
          <label className="text-gray-200 font-bold">Biểu đồ doanh thu của năm</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <br />
          <a href="/chartdetail" className="text-blue-500 hover:underline">Detail</a>
        </div>
        <div className="mb-4">
          <button 
            onClick={handleOpenModal} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
          >
            Show Chart By Game
          </button>
        </div>
        <div className="bg-gray-800 text-center rounded p-4 mb-8">
          <ResponsiveContainer width="100%" height={450} >
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <YAxis 
                tick={{ fill:"#dcdcdc" }} 
                tickFormatter={formatCurrency}
                interval="preserveStartEnd"
                domain={[0, 'auto']}
                className="text-[10px]" 
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill:"#dcdcdc" }} 
                interval={0} 
                angle={-45} 
                textAnchor="end" 
              />
              <Tooltip formatter={formatCurrency} />
              <Bar dataKey="value" fill="#5257eb">
                <LabelList 
                  dataKey="value" 
                  position="top" 
                  fill="#dcdcdc" 
                  className="text-[12px]" 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

  
   

    
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-customTypeEdition rounded-lg shadow-lg w-11/12 md:w-10/11 lg:w-3/4  p-6 relative">
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-gray-50 hover:text-gray-200"
              >
                X
              </button>
              <h2 className=" text-xl font-bold mb-4 text-gray-50">Chart By Game</h2>
              <div className="bg-gray-800 text-center rounded ">
                {isLoading2 ? (
                  <p className="text-white">Loading Pie Chart...</p>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={data2}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        label
                      >
                        {data2.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;
