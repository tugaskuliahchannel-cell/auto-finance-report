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
    <div style={{padding:40}}>

      <h1>Transaksi Keuangan</h1>

      <select
        value={type}
        onChange={e=>setType(e.target.value)}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <br/><br/>

      <input
        placeholder="Kategori"
        value={category}
        onChange={e=>setCategory(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Nominal"
        value={amount}
        onChange={e=>setAmount(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Catatan"
        value={note}
        onChange={e=>setNote(e.target.value)}
      />

      <br/><br/>

      <button onClick={simpan}>
        Simpan
      </button>

      <hr/>

      <h2>List Transaksi</h2>

      {data.map(item=>(
        <div key={item.id} style={{marginBottom:10}}>
          {item.type.toUpperCase()} |
          {item.category} |
          Rp {item.amount} |
          {item.note}

          <button
            onClick={()=>hapus(item.id)}
            style={{marginLeft:10}}
          >
            Hapus
          </button>
        </div>
      ))}

    </div>
  )
}