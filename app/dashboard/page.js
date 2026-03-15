"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js"

ChartJS.register(CategoryScale,LinearScale,BarElement)

export default function Dashboard(){

  const [income,setIncome]=useState(0)
  const [expense,setExpense]=useState(0)

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")

    const totalIncome =
      data
        .filter(d=>d.type==="income")
        .reduce((a,b)=>a+b.amount,0)

    const totalExpense =
      data
        .filter(d=>d.type==="expense")
        .reduce((a,b)=>a+b.amount,0)

    setIncome(totalIncome)
    setExpense(totalExpense)
  }

  return (
    <div style={{padding:40}}>
      <h1>Dashboard Keuangan</h1>

      <Bar
        data={{
          labels:["Income","Expense"],
          datasets:[
            {
              label:"Cashflow",
              data:[income,expense]
            }
          ]
        }}
      />

      <h2>Total Income: Rp {income}</h2>
      <h2>Total Expense: Rp {expense}</h2>

    </div>
  )
}