"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Page(){

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
        type:"income",
        category:"test",
        account:"pribadi",
        amount:Number(amount),
        note
      }
    ])

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

      <h1>Input Transaksi</h1>

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

      <h2>Data Transaksi</h2>

      {data.map(item => (
        <div key={item.id} style={{marginBottom:10}}>
          Rp {item.amount} - {item.note}

          <button
            onClick={()=>hapus(item.id)}
            style={{
              marginLeft:10,
              background:"red",
              color:"white"
            }}
          >
            Hapus
          </button>
        </div>
      ))}

    </div>
  )
}