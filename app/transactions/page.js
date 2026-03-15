"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Page(){

  const [type,setType]=useState("expense")
  const [category,setCategory]=useState("")
  const [amount,setAmount]=useState("")
  const [note,setNote]=useState("")
  const [data,setData]=useState([])

  const loadData = async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("date",{ascending:false})

    setData(data)
  }

  useEffect(()=>{
    loadData()
  },[])

  const simpan = async () => {

    await supabase.from("transactions").insert([
      {
        type,
        category,
        account:"pribadi",
        amount:Number(amount),
        note
      }
    ])

    setCategory("")
    setAmount("")
    setNote("")
    loadData()
  }

  const hapus = async (id) => {
    await supabase
      .from("transactions")
      .delete()
      .eq("id", id)

    loadData()
  }

  return (
  <div style={{
    padding:40,
    background:"#eef2f7",
    minHeight:"100vh",
    color:"#111"
  }}>

    <div style={{
      maxWidth:600,
      margin:"auto",
      background:"white",
      padding:30,
      borderRadius:12,
      boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{marginBottom:20}}>Tambah Transaksi</h2>

      <select
        value={type}
        onChange={e=>setType(e.target.value)}
        style={{width:"100%",padding:12,marginBottom:10}}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        placeholder="Kategori"
        value={category}
        onChange={e=>setCategory(e.target.value)}
        style={{width:"100%",padding:12,marginBottom:10}}
      />

      <input
        placeholder="Nominal"
        value={amount}
        onChange={e=>setAmount(e.target.value)}
        style={{width:"100%",padding:12,marginBottom:10}}
      />

      <input
        placeholder="Catatan"
        value={note}
        onChange={e=>setNote(e.target.value)}
        style={{width:"100%",padding:12,marginBottom:10}}
      />

      <button
        onClick={simpan}
        style={{
          width:"100%",
          padding:14,
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:10,
          fontWeight:"bold"
        }}
      >
        Simpan Transaksi
      </button>
    </div>

    <div style={{
      maxWidth:600,
      margin:"20px auto",
      background:"white",
      padding:30,
      borderRadius:12,
      boxShadow:"0 5px 15px rgba(0,0,0,0.05)"
    }}>
      <h3 style={{marginBottom:15}}>Riwayat Transaksi</h3>

      {data.map(item=>(
        <div key={item.id}
          style={{
            borderBottom:"1px solid #eee",
            padding:"12px 0",
            fontSize:16
          }}>
          <b style={{
            color: item.type==="income"
              ? "green"
              : "red"
          }}>
            {item.type.toUpperCase()}
          </b>
          {" | "}
          {item.category}
          {" | "}
          <b>Rp {item.amount}</b>

          <button
            onClick={()=>hapus(item.id)}
            style={{
              float:"right",
              background:"#ef4444",
              color:"white",
              border:"none",
              padding:"6px 12px",
              borderRadius:6
            }}
          >
            Hapus
          </button>
        </div>
      ))}

    </div>

  </div>
)
}