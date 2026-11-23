import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router'
import { updateEntry, getEntryById } from "../services/entriesService"

function EditEntry() {
    const [ formData, setFormData ] = useState({
        title: '',
        entryBody: '',
        isPublic: false
    })
    const {entryId} = useParams()

    async function loadEntry() {
        const response = await getEntryById(entryId)
        setFormData(response)
    }

    useEffect(()=>{
        loadEntry()
    },[])

    const navigate = useNavigate()

    function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const updatedEntry = await updateEntry(entryId, formData)

        navigate('/entries')
    }
  return (
    <div>
        <h1>Edit Entry</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input 
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange} 
            />
            <br />
            <br />

            <label htmlFor="entryBody">Body:</label>
            <input 
            type="text"
            name="entryBody"
            id="entryBody"
            value={formData.entryBody}
            onChange={handleChange} 
            />
            <br />
            <br />

            <label htmlFor="isPublic">Public?</label>
            <input 
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value={formData.isPublic}
            onChange={handleChange} 
            />
            <br />
            <br />

            <button>Update Entry</button>
        </form>
    </div>
  )
}

export default EditEntry