import api from "./api";


async function getMyEntries() {
    const response = await api.get('/entries/my-entries')
    return response.data
}

async function getAllEntries() {
    const response = await api.get('/entries')
    return response.data
}

async function createEntry(entryBody) {
    const response = await api.post('/entries', entryBody)
    return response.data
}

async function getEntryById(entryId) {
    const response = await api.get(`/entries/${entryId}`)

    return response.data
}

async function deleteEntry(entryId) {
    const response = await api.delete(`/entries/${entryId}`)

    return response.data
}

async function updateEntry(entryId, entryBody) {
    const response = await api.put(`/entries/${entryId}`, entryBody)

    return response.data
}


export{
    getMyEntries,
    getAllEntries,
    createEntry,
    getEntryById,
    deleteEntry,
    updateEntry
}