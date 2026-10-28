import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const isAdmin = !!loggedinUser?.isAdmin

    useEffect(() => {
        onLoadToys()
    }, [filterBy])

    async function onLoadToys() {
        try {
            await loadToys()
        } catch (err) {
            showErrorMsg('Cannot load toys!')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        } catch (err) {
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }

    return (
        <div className="toy-index">
            <h3>Toys App</h3>
            <main>
                {isAdmin && <>
                    <Link to="/toy/edit">Add Toy</Link>
                    <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button>
                </>}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        isAdmin={isAdmin}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}