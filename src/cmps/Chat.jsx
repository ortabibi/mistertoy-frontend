import { useState } from 'react'

export function Chat() {
    const [msgs, setMsgs] = useState([])
    const [txt, setTxt] = useState('')

    function onSend(ev) {
        ev.preventDefault()
        if (!txt) return

        setMsgs(prevMsgs => [...prevMsgs, { by: 'Me', txt }])
        setTxt('')

        setTimeout(() => {
            setMsgs(prevMsgs => [...prevMsgs, { by: 'Support', txt: 'Sure thing honey' }])
        }, 1000)
    }

    return (
        <section className="chat">
            <ul>
                {msgs.map((msg, idx) => (
                    <li key={idx}><b>{msg.by}:</b> {msg.txt}</li>
                ))}
            </ul>

            <form onSubmit={onSend}>
                <input
                    value={txt}
                    onChange={ev => setTxt(ev.target.value)}
                    placeholder="Type a message..."
                />
                <button>Send</button>
            </form>
        </section>
    )
}