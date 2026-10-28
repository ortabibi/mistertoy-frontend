import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getLabels,
    addToyMsg,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function addToyMsg(toyId, txt) {
    return httpService.post(BASE_URL + toyId + '/msg', { txt })
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
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: undefined, labels: [], sortBy: '' }
}

function getLabels() {
    return [...labels]
}