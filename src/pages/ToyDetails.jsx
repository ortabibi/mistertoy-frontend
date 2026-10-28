import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { NicePopup } from '../cmps/NicePopup.jsx'
import { Chat } from '../cmps/Chat.jsx'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [msgTxt, setMsgTxt] = useState('')
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
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

    async function onAddMsg(ev) {
        ev.preventDefault()
        if (!msgTxt.trim()) return
        try {
            const savedMsg = await toyService.addToyMsg(toy._id, msgTxt)
            setToy(prevToy => ({ ...prevToy, msgs: [...(prevToy.msgs || []), savedMsg] }))
            setMsgTxt('')
            showSuccessMsg('Message added')
        } catch (err) {
            console.log('Cannot add msg', err)
            showErrorMsg('Cannot add message')
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
                {loggedinUser?.isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>}
                <Link to="/toy">Back to list</Link>
            </div>
            <button onClick={() => setIsChatOpen(true)}>Chat</button>

            <section className="toy-msgs">
                <h3>Messages</h3>
                {toy.msgs?.length
                    ? <ul>
                        {toy.msgs.map(msg => (
                            <li key={msg.id}>
                                <strong>{msg.by.fullname}:</strong> {msg.txt}
                            </li>
                        ))}
                    </ul>
                    : <p>No messages yet</p>
                }

                {loggedinUser
                    ? <form onSubmit={onAddMsg}>
                        <input
                            type="text"
                            value={msgTxt}
                            onChange={ev => setMsgTxt(ev.target.value)}
                            placeholder="Write a message..."
                        />
                        <button>Send</button>
                    </form>
                    : <p><Link to="/login">Login</Link> to add a message</p>
                }
            </section>

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
