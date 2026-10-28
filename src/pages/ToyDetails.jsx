import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { NicePopup } from '../cmps/NicePopup.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Cannot load toy', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <p>Price: ${toy.price}</p>
            <p>{toy.inStock ? 'In stock' : 'Out of stock'}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>Created: {new Date(toy.createdAt).toLocaleDateString()}</p>

            <div className="actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to="/toy">Back to list</Link>
            </div>
            <button onClick={() => setIsChatOpen(true)}>Chat</button>

            {isChatOpen && (
                <NicePopup
                    heading="Chat about this toy"
                    footing={<small>We usually reply fast</small>}
                    onClose={() => setIsChatOpen(false)}
                >
                    <Chat />
                </NicePopup>
            )}
        </section>
    )
}