import axios from "axios"
import { useEffect, useState } from "react"

export interface StockData {
    symbol: string
    company_name: string
    id: number;
    current_price: number
    logo: string
    change: number
    marketCap: number
    ceo: string
    founded: string
    headquarters: string
    employees: number
    revenue: number
    netIncome: number
    description: string
    industry: string
    website: string
    volume?: number
    open_price?: number
    high_price?: number
    low_price?: number
    previous_close?: number
    pe_ratio?: number
    dividend_yield?: number
    market_status?: 'open' | 'closed'
    sector?: string
    exchange?: string
    currency?: string
    country?: string
    last_updated?: string
  }
  

  
export const useStockData = () => {
  const [data, setData] = useState<StockData[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get_listing")
        if (response.data && Array.isArray(response.data.rows)) {
          const updatedData = response.data.rows.map((item: any) => ({
            ...item,
            netIncome: item.netIncome || 1000000, 
            change: item.change || 0,
            ceo: item.ceo || "ntwali brian",
            headquarters: item.headquarters || "Kigali",
            employees: item.employees || 123,
            marketCap: item.marketCap || 120000000,
            revenue: item.revenue || 120000,
            
            industry: item.industry || "dioufism",
            description: item.description || "diouf did didnt he",
            website: item.website || "https://www.bk.rw",
            founded: item.founded || "1230",
          }));
          setData(updatedData);
        }else {
          setError('Invalid data structure received');
        }
        
      }catch (err) {
        console.error('Error occurred:', err);
        setError('Failed to fetch data');
      }finally {
        setLoading(false); // Stop loading after the data is fetched (or error occurs)
      }
    }
    fetchData();
  }, [])
  return {data, loading, error };
}
