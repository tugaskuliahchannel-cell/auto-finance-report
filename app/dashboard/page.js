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
backgroundColor:["#22c55e","#ef4444"]
}
]
}

return(
<div style={{
padding:40,
background:"#f1f5f9",
minHeight:"100vh",
color:"#111"
}}>

<h1 style={{marginBottom:20}}>Dashboard Keuangan</h1>

<div style={{
display:"flex",
gap:20,
flexWrap:"wrap"
}}>

<div style={{
background:"white",
padding:25,
borderRadius:14,
minWidth:220,
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}}>
<h3 style={{marginBottom:10}}>Saldo Total</h3>
<h1 style={{
fontSize:32,
color: saldo>=0 ? "#16a34a" : "#dc2626"
}}>
Rp {saldo}
</h1>
</div>

<div style={{
background:"white",
padding:25,
borderRadius:14,
minWidth:220,
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}}>
<h3>Total Income</h3>
<h2 style={{color:"#16a34a"}}>Rp {income}</h2>
</div>

<div style={{
background:"white",
padding:25,
borderRadius:14,
minWidth:220,
boxShadow:"0 5px 15px rgba(0,0,0,0.08)"
}}>
<h3>Total Expense</h3>
<h2 style={{color:"#dc2626"}}>Rp {expense}</h2>
</div>

</div>

<div style={{
background:"white",
padding:30,
borderRadius:14,
marginTop:30,
maxWidth:700,
boxShadow:"0 5px 15px rgba(0,0,0,0.05)"
}}>
<Bar data={chartData}/>
</div>

</div>
)
}