import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getLabels,
}

async function query(filterBy = {}) {
    let toys = await storageService.query(STORAGE_KEY)

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
    }

    if (typeof filterBy.inStock === 'boolean') {
        toys = toys.filter(toy => toy.inStock === filterBy.inStock)
    }

    if (filterBy.labels && filterBy.labels.length) {
        toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
    }

    if (filterBy.sortBy === 'name') {
        toys.sort((toy1, toy2) => toy1.name.localeCompare(toy2.name))
    } else if (filterBy.sortBy === 'price') {
        toys.sort((toy1, toy2) => toy1.price - toy2.price)
    } else if (filterBy.sortBy === 'createdAt') {
        toys.sort((toy1, toy2) => toy2.createdAt - toy1.createdAt)
    }

    return toys
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: '',
        labels: [],
        inStock: true,
    }
}

function getRandomToy() {
    const shuffledLabels = [...labels].sort(() => Math.random() - 0.5)
    return {
        name: 'Toy-' + (Date.now() % 1000),
        imgUrl: 'hardcoded-url-for-now',
        price: utilService.getRandomIntInclusive(20, 300),
        labels: shuffledLabels.slice(0, utilService.getRandomIntInclusive(1, 3)),
        inStock: Math.random() > 0.3,
        createdAt: Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 30),
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: undefined, labels: [], sortBy: '' }
}

function getLabels() {
    return [...labels]
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = []
    for (var i = 0; i < 12; i++) {
        const toy = getRandomToy()
        toy._id = utilService.makeId()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}