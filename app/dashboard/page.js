"use client"
import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
)

export default function Page(){

const [data,setData]=useState([])
const [saldo,setSaldo]=useState(0)
const [income,setIncome]=useState(0)
const [expense,setExpense]=useState(0)

useEffect(()=>{
load()
},[])

const load = async ()=>{
const { data } = await supabase
.from("transactions")
.select("*")

setData(data)

let totalIncome=0
let totalExpense=0

data.forEach(item=>{
if(item.type==="income"){
totalIncome+=item.amount
}else{
totalExpense+=item.amount
}
})

setIncome(totalIncome)
setExpense(totalExpense)
setSaldo(totalIncome-totalExpense)
}

const chartData={
labels:["Income","Expense"],
datasets:[
{
label:"Keuangan",
data:[income,expense],
backgroundColor:["green","red"]
}
]
}

return(
<div style={{
padding:40,
background:"#eef2f7",
minHeight:"100vh"
}}>

<h1>Dashboard Keuangan</h1>

<div style={{
display:"flex",
gap:20,
marginTop:20,
flexWrap:"wrap"
}}>

<div style={{
background:"white",
padding:20,
borderRadius:12,
minWidth:200
}}>
<h3>Saldo Total</h3>
<h2>Rp {saldo}</h2>
</div>

<div style={{
background:"white",
padding:20,
borderRadius:12,
minWidth:200
}}>
<h3>Total Income</h3>
<h2 style={{color:"green"}}>Rp {income}</h2>
</div>

<div style={{
background:"white",
padding:20,
borderRadius:12,
minWidth:200
}}>
<h3>Total Expense</h3>
<h2 style={{color:"red"}}>Rp {expense}</h2>
</div>

</div>

<div style={{
background:"white",
padding:30,
borderRadius:12,
marginTop:30,
maxWidth:600
}}>
<Bar data={chartData}/>
</div>

</div>
)
}