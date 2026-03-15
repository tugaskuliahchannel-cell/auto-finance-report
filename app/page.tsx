export default function Home(){
  return (
    <div style={{
      padding:50,
      fontFamily:"Arial",
      textAlign:"center"
    }}>
      <h1>AUTO FINANCE REPORT</h1>

      <p>Aplikasi Keuangan Pribadi & Usaha</p>

      <br/>

      <a href="/dashboard">
        <button style={{
          padding:15,
          margin:10,
          background:"blue",
          color:"white",
          border:"none"
        }}>
          Dashboard
        </button>
      </a>

      <a href="/transactions">
        <button style={{
          padding:15,
          margin:10,
          background:"green",
          color:"white",
          border:"none"
        }}>
          Transaksi
        </button>
      </a>

    </div>
  )
}