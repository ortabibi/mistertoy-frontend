import { toyService } from '../services/toy.service.js'
import { useState, useEffect, useRef } from 'react'

import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        debouncedOnSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value } = target
        if (field === 'inStock') {
            value = value === '' ? undefined : value === 'true'
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onToggleLabel(label) {
        setFilterByToEdit(prevFilter => {
            const labels = prevFilter.labels.includes(label)
                ? prevFilter.labels.filter(currLabel => currLabel !== label)
                : [...prevFilter.labels, label]
            return { ...prevFilter, labels }
        })
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

            <details className="labels-dropdown">
                <summary>
                    {filterByToEdit.labels.length ? `Labels (${filterByToEdit.labels.length})` : 'All labels'}
                </summary>
                <div className="labels-menu">
                    {toyService.getLabels().map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                checked={filterByToEdit.labels.includes(label)}
                                onChange={() => onToggleLabel(label)}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </details>
        </section>
    )
}