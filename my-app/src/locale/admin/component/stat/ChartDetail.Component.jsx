import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import axios from 'axios';

const ChartDetail = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data2, setData2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      loadChartData(token);
      loadChartData2(token);
    } else {
      console.error("Token not found");
    }
  }, []);

  const loadChartData = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/data2023", {
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

  const loadChartData2 = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/data2024", {
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
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'VND');
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={450}>
             <h5 className="text-gray-300" style={{ marginLeft: '40%' }}>Biểu đồ doanh thu năm 2023</h5>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill:"#dcdcdc" }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="value" fill="rgb(255,180,31)">
              <LabelList dataKey="value" position="top" formatter={(value) => formatCurrency(value)} offset={10} />
            </Bar>
          </BarChart>
       
        </ResponsiveContainer>
      )}

      <br /><br />

      {isLoading2 ? (
        <p>Loading data...</p>
      ) : (
        
        <ResponsiveContainer width="100%" height={500}>
            <h5 className="text-gray-300 " style={{ marginLeft: '40%' }}>Biểu đồ doanh thu năm 2024</h5>
          <BarChart data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill:"#dcdcdc" }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
         
            <Bar dataKey="value" fill="rgb(255,180,31)">
              <LabelList dataKey="value" position="top" formatter={(value) => formatCurrency(value)} offset={10} />
            </Bar>
          </BarChart>
        
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ChartDetail;
