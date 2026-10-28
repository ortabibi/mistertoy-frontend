import { toyService } from '../services/toy.service.js'
import { useState, useEffect, useRef } from 'react'


import { utilService } from "../services/util.service.js"
import { Select, MenuItem, Chip, Box, OutlinedInput } from '@mui/material'


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
            <Select
                multiple
                displayEmpty
                size="small"
                value={filterByToEdit.labels}
                onChange={ev => setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: ev.target.value }))}
                input={<OutlinedInput />}
                renderValue={selected => selected.length
                    ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map(label => <Chip key={label} label={label} size="small" />)}
                        </Box>
                    )
                    : 'All labels'
                }
                sx={{ minWidth: 200, backgroundColor: 'white' }}
            >
                {toyService.getLabels().map(label => (
                    <MenuItem key={label} value={label}>{label}</MenuItem>
                ))}
            </Select>
        </section>
    )
}