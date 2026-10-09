import { useState, useEffect } from 'react'

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value } = target
        if (field === 'inStock') {
            value = value === '' ? undefined : value === 'true'
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const inStockValue = filterByToEdit.inStock === undefined ? '' : String(filterByToEdit.inStock)

    return (
        <section className="toy-filter">
            <input
                type="text"
                name="txt"
                placeholder="Search by name"
                value={filterByToEdit.txt || ''}
                onChange={handleChange}
            />

            <select name="inStock" value={inStockValue} onChange={handleChange}>
                <option value="">All</option>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>

            <select name="sortBy" value={filterByToEdit.sortBy || ''} onChange={handleChange}>
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>
        </section>
    )
}