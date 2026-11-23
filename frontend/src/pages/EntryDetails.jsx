import { useParams, Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { getEntryById, deleteEntry } from '../services/entriesService'
import { useAuth } from '../context/AuthContext'

function EntryDetails() {
    const [ entry, setEntry ] = useState(null)
    const {entryId} = useParams()

    async function loadEntry() {
        const response = await getEntryById(entryId)
        setEntry(response)
    }

    const navigate = useNavigate()

    async function handleDelete() {
        await deleteEntry(entryId)

        navigate('/entries')
    }

    useEffect(()=>{
        loadEntry()
    },[])

    const {user} = useAuth()

  return (
    <div>
        <h1>Entry Details</h1>
        {entry ? <>
        <h2>{entry.title}</h2>
        <p>{entry.entryBody}</p>
        </>:null}

        {entry && entry.owner === user._id ? <>
            <Link to={`/entries/${entry._id}/edit`}>Edit Entry</Link>
            <button onClick={handleDelete}>Delete Entry</button>
            </>: null}

    </div>
  )
}

export default EntryDetails