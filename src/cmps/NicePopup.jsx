import { useEffect } from 'react'

export function NicePopup({ heading, footing, children, onClose }) {

    useEffect(() => {
        function handleKeyDown(ev) {
            if (ev.key === 'Escape') onClose()
        }
        document.body.addEventListener('keydown', handleKeyDown)
        return () => document.body.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <div className="nice-popup-backdrop" onClick={onClose}>
            <section className="nice-popup" onClick={ev => ev.stopPropagation()}>
                <header>
                    {heading}
                    <button onClick={onClose}>x</button>
                </header>
                <main>{children}</main>
                <footer>{footing}</footer>
            </section>
        </div>
    )
}