import { useState, useEffect } from "react"
import { getAllEntries } from "../services/entriesService"
import { Link } from 'react-router'

function AllEntries() {
    const [ entries, setEntries ] = useState([])

    async function loadEntries() {
        const response = await getAllEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    },[])

  return (
    <div>
        <h1>All Entries</h1>
        {entries.map((oneEntry)=><div key={oneEntry._id}>
            {oneEntry.title}
            <Link to={`/entries/${oneEntry._id}`}>See Details</Link>
        </div>)}
    </div>
  )
}

export default AllEntries