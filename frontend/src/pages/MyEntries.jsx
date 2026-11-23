import { useState, useEffect } from "react"
import { getMyEntries } from "../services/entriesService"
import { Link } from 'react-router'

function MyEntries() {
    const [ entries, setEntries ] = useState([])

    async function loadEntries() {
        const response = await getMyEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    },[])

  return (
    <div>
        <h1>My Entries</h1>
        {entries.map((oneEntry)=><div key={oneEntry._id}>
            <h2>{oneEntry.title}</h2>
            <Link to={`/entries/${oneEntry._id}`}>See Details</Link>
        </div>)}
    </div>
  )
}

export default MyEntries