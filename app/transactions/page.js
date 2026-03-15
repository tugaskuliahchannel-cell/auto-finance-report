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
    background:"#f1f5f9",
    minHeight:"100vh"
  }}>

    <div style={{
      maxWidth:600,
      margin:"auto",
      background:"white",
      padding:30,
      borderRadius:10,
      boxShadow:"0 0 10px rgba(0,0,0,0.1)"
    }}>

      <h2>Tambah Transaksi</h2>

      <select
        value={type}
        onChange={e=>setType(e.target.value)}
        style={{width:"100%",padding:10,marginTop:10}}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        placeholder="Kategori"
        value={category}
        onChange={e=>setCategory(e.target.value)}
        style={{width:"100%",padding:10,marginTop:10}}
      />

      <input
        placeholder="Nominal"
        value={amount}
        onChange={e=>setAmount(e.target.value)}
        style={{width:"100%",padding:10,marginTop:10}}
      />

      <input
        placeholder="Catatan"
        value={note}
        onChange={e=>setNote(e.target.value)}
        style={{width:"100%",padding:10,marginTop:10}}
      />

      <button
        onClick={simpan}
        style={{
          width:"100%",
          padding:12,
          marginTop:15,
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:8
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
      borderRadius:10
    }}>

      <h3>Riwayat Transaksi</h3>

      {data.map(item=>(
        <div key={item.id}
          style={{
            borderBottom:"1px solid #ddd",
            padding:"10px 0"
          }}>
          <b>{item.type.toUpperCase()}</b> |
          {item.category} |
          Rp {item.amount}

          <button
            onClick={()=>hapus(item.id)}
            style={{
              float:"right",
              background:"red",
              color:"white",
              border:"none",
              padding:"5px 10px",
              borderRadius:5
            }}
          >
            Hapus
          </button>
        </div>
      ))}

    </div>

  </div>
)