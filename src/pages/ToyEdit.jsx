import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Formik, Field, Form } from "formik";

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    // const setHasChanges = useConfirmTabClose()

    useEffect(() => {
        // Non-admins who type the URL are sent back (the backend blocks them anyway)
        if (!loggedinUser?.isAdmin) {
            showErrorMsg('Only admin can edit toys')
            navigate('/toy')
            return
        }
        if (toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            navigate('/toy')
        }
    }

    async function onSaveToy(values) {
        try {
            await saveToy(values)
            showSuccessMsg('Toy Saved!')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues saving toy', err)
            showErrorMsg('Cannot save toy')
        }
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <Formik
                initialValues={toyToEdit}
                enableReinitialize
                onSubmit={onSaveToy}
            >
                <Form>
                    <label htmlFor="name">Name : </label>
                    <Field name="name" id="name" type="text" placeholder="Enter name..." />

                    <label htmlFor="price">Price : </label>
                    <Field name="price" id="price" type="number" placeholder="Enter price" />

                    <label htmlFor="inStock">In stock : </label>
                    <Field name="inStock" id="inStock" type="checkbox" />

                    <label htmlFor="labels">Labels : </label>
                    <Field as="select" name="labels" id="labels" multiple>
                        {toyService.getLabels().map(label => (
                            <option key={label} value={label}>{label}</option>
                        ))}
                    </Field>

                    <div>
                        <button type="submit">{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <Link to="/toy">Cancel</Link>
                    </div>
                </Form>
            </Formik>
        </section>
    )
}


