"use client"
import React, { useState, useEffect } from 'react'

export default function Page() {
  const [total, setTotal] = useState(0);
  const [cash, setCash] = useState(0);
  const [transfer, setTransfer] = useState(0);
  const [type, setType] = useState<'cash' | 'transfer'>('cash');

  // โหลดค่าจาก Local Storage ตอน mount
  useEffect(() => {
    const storedTotal = localStorage.getItem("total");
    const storedCash = localStorage.getItem("cash");
    const storedTransfer = localStorage.getItem("transfer");
    if (storedTotal !== null) setTotal(parseInt(storedTotal, 10));
    if (storedCash !== null) setCash(parseInt(storedCash, 10));
    if (storedTransfer !== null) setTransfer(parseInt(storedTransfer, 10));
  }, []);

  // อัปเดต Local Storage ทุกครั้งที่ยอดเปลี่ยน
  useEffect(() => {
    localStorage.setItem("total", total.toString());
    localStorage.setItem("cash", cash.toString());
    localStorage.setItem("transfer", transfer.toString());
  }, [total, cash, transfer]);

  const items = [
    { name: "รายวัน", amount: 50 },
    { name: "น้ำเล็ก", amount: 10 },
    { name: "น้ำใหญ่", amount: 15 },
    { name: "โค๊ก", amount: 17 },
    { name: "เชว๊ป", amount: 17 },
  ];

  const resetCount = () => {
    setTotal(0);
    setCash(0);
    setTransfer(0);
  };

  const handleAdd = (amount: number) => {
    setTotal(prev => prev + amount);
    if (type === 'cash') setCash(prev => prev + amount);
    else setTransfer(prev => prev + amount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">ยอดรวม</h1>
        <div className="text-5xl font-bold text-center text-green-600 mb-4">{total} ฿</div>
        <div className="text-lg text-center mb-6">
          <span className="text-gray-700">เงินสด: </span>
          <span className="text-green-700 font-bold">{cash} ฿</span>
          <span className="mx-2">|</span>
          <span className="text-gray-700">เงินโอน: </span>
          <span className="text-blue-700 font-bold">{transfer} ฿</span>
        </div>

        <div className="flex justify-center mb-4 gap-4">
          <button
            className={`py-2 px-6 rounded-xl font-semibold shadow transition duration-300 cursor-pointer ${
              type === 'cash' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setType('cash')}
          >
            เงินสด
          </button>
          <button
            className={`py-2 px-6 rounded-xl font-semibold shadow transition duration-300 cursor-pointer ${
              type === 'transfer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setType('transfer')}
          >
            เงินโอน
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleAdd(item.amount)}
              className="bg-green-400 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow cursor-pointer"
            >
              + {item.name} ({item.amount}฿)
            </button>
          ))}
        </div>

        <button
          onClick={resetCount}
          className="w-full bg-red-400 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow transition duration-300 cursor-pointer"
        >
          รีเซ็ตยอด
        </button>
      </div>
    </div>
  );
}