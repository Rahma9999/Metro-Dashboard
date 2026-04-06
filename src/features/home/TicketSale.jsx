import React from 'react'
import { Container } from 'react-bootstrap';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MONTHLY_TICKETS = [
    { tickets: 10, ratio: 142000 },
    { tickets: 15, ratio: 158000 },
    { tickets: 20, ratio: 171000 },
    { tickets: 35, ratio: 163000 },
];

function TicketSale() {
    return (
        <div>
                <Container className='mt-2'>
                <h4 className="txtTitle">Ticket Sales</h4>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={MONTHLY_TICKETS} className='mt-3'>
                    <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C2FF" />
                        <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="tickets" tick={{ fill: "#475569", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip />
                    <Bar dataKey="ratio" name="Tickets Sold" fill="url(#barGrad)" radius={[6,6,0,0]} />
                    </BarChart>
                </ResponsiveContainer>
                </Container>
        </div>
    )
}

export default TicketSale
