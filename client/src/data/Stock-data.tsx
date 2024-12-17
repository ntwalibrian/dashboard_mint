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

  //   export const rwandanStocks: StockData[] = [
  //   {
  //     symbol: 'BOK',
  //     name: 'Bank of Kigali',
  //     price: 300,
  //     change: 1.5,
  //     ceo: 'Diane Karusisi',
  //     founded: 1966,
  //     headquarters: 'Kigali, Rwanda',
  //     employees: 1500,
  //     marketCap: 201000000000,
  //     revenue: 118700000000,
  //     netIncome: 37600000000,
  //     industry: 'Banking',
  //     description: 'Bank of Kigali is the largest commercial bank in Rwanda by total assets. The bank offers retail and commercial banking services.',
  //     website: 'https://www.bk.rw',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/bk_icon.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL2JrX2ljb24uanBnIiwiaWF0IjoxNzMzMzk2NzM3LCJleHAiOjE3NjQ5MzI3Mzd9.jmOf8RYKlPlXvldq_cBf4E_jRGneBdHGfi7HQtBHHt4&t=2024-12-05T11%3A05%3A37.866Z?height=40&width=40'
  //   },
  //   {
  //     symbol: 'BLR',
  //     name: 'Bralirwa',
  //     price: 150,
  //     change: -0.8,
  //     ceo: 'Merid Demissie',
  //     founded: 1957,
  //     headquarters: 'Kigali, Rwanda',
  //     employees: 800,
  //     marketCap: 153900000000,
  //     revenue: 122000000000,
  //     netIncome: 9800000000,
  //     industry: 'Beverages',
  //     description: 'Bralirwa is the largest brewery and soft beverage company in Rwanda. It produces and distributes beer and soft drinks.',
  //     website: 'https://www.bralirwa.co.rw',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/bralirwa_plc_logo.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL2JyYWxpcndhX3BsY19sb2dvLmpwZWciLCJpYXQiOjE3MzMzOTY3NTksImV4cCI6MTc2NDkzMjc1OX0.RcT9E7Yez7FRut-BZc9J8xScR6wdFF9dPHlreXVcPtQ&t=2024-12-05T11%3A06%3A00.348Z?height=40&width=40'
  //   },
  //   {
  //     symbol: 'EQT',
  //     name: 'Equity Bank Rwanda',
  //     price: 400,
  //     change: 2.1,
  //     ceo: 'Hannington Namara',
  //     founded: 2011,
  //     headquarters: 'Kigali, Rwanda',
  //     employees: 650,
  //     marketCap: 180000000000,
  //     revenue: 45000000000,
  //     netIncome: 12000000000,
  //     industry: 'Banking',
  //     description: 'Equity Bank Rwanda is a commercial bank and a subsidiary of Equity Group Holdings. It provides retail and corporate banking services.',
  //     website: 'https://equitygroupholdings.com/rw',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/Equity.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL0VxdWl0eS5wbmciLCJpYXQiOjE3MzMzOTY4MDcsImV4cCI6MTc2NDkzMjgwN30.wpEGVxkzLRsRd_5DeslOdDfhpT03_1uJRURUQRLeFE8&t=2024-12-05T11%3A06%3A48.264Z?height=40&width=40'
  //   },
  //   {
  //     symbol: 'IMR',
  //     name: 'I&M Bank Rwanda',
  //     price: 120,
  //     change: -1.2,
  //     ceo: 'Robin Bairstow',
  //     founded: 1963,
  //     headquarters: 'Kigali, Rwanda',
  //     employees: 700,
  //     marketCap: 90000000000,
  //     revenue: 38000000000,
  //     netIncome: 10000000000,
  //     industry: 'Banking',
  //     description: 'I&M Bank Rwanda is a commercial bank offering a wide range of banking products and services to individuals and businesses.',
  //     website: 'https://www.imbank.com/rwanda',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/banner1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL2Jhbm5lcjEucG5nIiwiaWF0IjoxNzMzMzk2NjkxLCJleHAiOjE3NjQ5MzI2OTF9.hue4nfZ4xi4se2QneuVVRbbNaNmh8txm1mQsixeOXdw&t=2024-12-05T11%3A04%3A51.834Z?height=40&width=40'
  //   },
  //   {
  //     symbol: 'NMG',
  //     name: 'Nation Media Group',
  //     price: 1200,
  //     change: 0.3,
  //     ceo: 'Stephen Gitagama',
  //     founded: 1959,
  //     headquarters: 'Nairobi, Kenya',
  //     employees: 1800,
  //     marketCap: 22680000000,
  //     revenue: 9100000000,
  //     netIncome: 320000000,
  //     industry: 'Media',
  //     description: 'Nation Media Group is the largest independent media house in East and Central Africa with operations in print, broadcast and digital media.',
  //     website: 'https://www.nationmedia.com',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/csm_14553-1508_company_import_b4a6409cb1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL2NzbV8xNDU1My0xNTA4X2NvbXBhbnlfaW1wb3J0X2I0YTY0MDljYjEuanBnIiwiaWF0IjoxNzMzMzk3MTEyLCJleHAiOjE3NjQ5MzMxMTJ9.Uff_DqtcGurhXtr8zZ1YpQWYGa9qCH1HLlojSrqcCE0&t=2024-12-05T11%3A11%3A52.937Z?height=40&width=40'
  //   },
  //   {
  //     symbol: 'RHB',
  //     name: 'RH Bophelo',
  //     price: 180,
  //     change: 1.8,
  //     ceo: 'Quinton Zunga',
  //     founded: 2017,
  //     headquarters: 'Johannesburg, South Africa',
  //     employees: 300,
  //     marketCap: 10260000000,
  //     revenue: 800000000,
  //     netIncome: 150000000,
  //     industry: 'Healthcare',
  //     description: 'RH Bophelo is an investment company focused on the African healthcare sector, particularly in South Africa and Rwanda.',
  //     website: 'https://www.rhbophelo.co.za',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/RH-Logo-small-540x416.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL1JILUxvZ28tc21hbGwtNTQweDQxNi5wbmciLCJpYXQiOjE3MzMzOTcwNTIsImV4cCI6MTc2NDkzMzA1Mn0.2iWMapz1FNWQP5f9eoM4odI5uaeex6nUgj49WJCs4Ng&t=2024-12-05T11%3A10%3A53.654Z?height=40&width=40'
  //   },
  //   {
  //     symbol: 'USL',
  //     name: 'Uchumi Supermarket',
  //     price: 50,
  //     change: -2.5,
  //     ceo: 'Mohamed Ahmed Mohamed',
  //     founded: 1975,
  //     headquarters: 'Nairobi, Kenya',
  //     employees: 1000,
  //     marketCap: 1800000000,
  //     revenue: 8500000000,
  //     netIncome: -2000000000,
  //     industry: 'Retail',
  //     description: 'Uchumi Supermarket is one of the largest supermarket chains in East Africa, operating in Kenya, Uganda, and Rwanda.',
  //     website: 'https://www.uchumi.com',
  //     logo: 'https://gdfbbwwoargbwviquznn.supabase.co/storage/v1/object/sign/stock_logo/rw-usl-logo-min.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdG9ja19sb2dvL3J3LXVzbC1sb2dvLW1pbi53ZWJwIiwiaWF0IjoxNzMzMzk3MDg3LCJleHAiOjE3NjQ5MzMwODd9.YBbI35_PUy2mzAegimD4WP364ljH7701kQvzh-qst_I&t=2024-12-05T11%3A11%3A28.267Z?height=40&width=40'
  //   }
  // ]