import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, isAdmin, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="actions">
                        {isAdmin && <>
                            <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            <button onClick={() => onEditToy(toy)}>Change price</button>
                        </>}
                        <Link to={`/toy/${toy._id}`}>Details</Link>
                        {isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>}
                    </div>
                </li>
            ))}
        </ul>
    )
}
