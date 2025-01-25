export interface Stocks {
    symbol: string
    company_name: string
    id: number;
    current_price: number
    logo: string
    change: number
    marketCap: number
    total_supply:number
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