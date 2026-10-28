import { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

import { toyService } from '../services/toy.service.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export function Dashbord() {
    const [toys, setToys] = useState([])

    useEffect(() => {
        loadToys()
    }, [])

    async function loadToys() {
        try {
            const toys = await toyService.query()
            setToys(toys)
        } catch (err) {
            console.log('Cannot load toys for dashboard', err)
        }
    }

    const labels = toyService.getLabels()

    const avgPrices = labels.map(label => {
        const toysWithLabel = toys.filter(toy => toy.labels.includes(label))
        if (!toysWithLabel.length) return 0
        const sum = toysWithLabel.reduce((acc, toy) => acc + toy.price, 0)
        return Math.round(sum / toysWithLabel.length)
    })

    const barData = {
        labels,
        datasets: [{
            label: 'Average price',
            data: avgPrices,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
    }

    const inStockPercents = labels.map(label => {
        const toysWithLabel = toys.filter(toy => toy.labels.includes(label))
        if (!toysWithLabel.length) return 0
        const inStockCount = toysWithLabel.filter(toy => toy.inStock).length
        return Math.round(inStockCount / toysWithLabel.length * 100)
    })

    const doughnutData = {
        labels,
        datasets: [{
            label: '% in stock',
            data: inStockPercents,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(46, 204, 113, 0.6)',
                'rgba(149, 165, 166, 0.6)',
            ],
        }],
    }

    const days = []
    for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        days.push(date.toLocaleDateString())
    }

    const lineData = {
        labels: days,
        datasets: [{
            label: 'Visitors',
            data: days.map(() => Math.floor(Math.random() * 100)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }],
    }

    return (
        <section className="dashboard">
            <h2>Dashboard</h2>

            <div className="chart">
                <h3>Average price per label</h3>
                <Bar data={barData} />
            </div>

            <div className="chart">
                <h3>% in stock per label</h3>
                <Doughnut data={doughnutData} />
            </div>

            <div className="chart">
                <h3>Visitors this week</h3>
                <Line data={lineData} />
            </div>
        </section>
    )
}