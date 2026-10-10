export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h4>{toy.name}</h4>
            <p>Price: ${toy.price}</p>
            <p>{toy.inStock ? 'In stock' : 'Out of stock'}</p>
            <p>{toy.labels.join(', ')}</p>
        </article>
    )
}