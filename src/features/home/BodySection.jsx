import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ticketAnalysis, subscriptionAnalysis } from '../../controllers/HomeController';
import { usePagination } from '../../services/usePagination';

// const SUBSCRIPTION_TYPES = [
//     { name: "Adults", value: 38, color: "#00C2FF" },
//     { name: "Students", value: 26, color: "#7C3AED" },
//     { name: "Individuals", value: 6, color: "#EF4444" },
// ];

// const MONTHLY_TICKETS = [
//     { tickets: 10, ratio: 142000 },
//     { tickets: 15, ratio: 158000 },
//     { tickets: 20, ratio: 171000 },
//     { tickets: 35, ratio: 163000 },
// ];

function BodySection() {
    const {state: { loading, error }, dispatch} = usePagination();
    const [ticketData, setTicketData] = useState([]);
    const [subData, setSubData] = useState([]);

    const handleAnalysis = async () => {
        try{
            //category.en, count, percentage
            const resSub = await subscriptionAnalysis();
            setSubData(resSub);

            //color, price, no_of_stations, count ,percentage
            const resTick = await ticketAnalysis();
            setTicketData(resTick);
        }catch(err){
            dispatch({
                type: 'setError',
                payload: err.message 
            });
        }
    }

    useEffect(() => {
            handleAnalysis();
        }, []);
        
    return (
        <Container className='mt-2 p-2'>
            <Row>
                <Col xs={12} md={6}>
                <h4 className="txtTitle">Subscription Breakdown</h4>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={ticketData} outerRadius={85} innerRadius={55} paddingAngle={3} label={({ name, value }) => `${value}%`} dataKey="value">
                    {ticketData.map((e, i) => 
                    <Cell key={i} fill={e.color} />
                    )}
                    </Pie>
                    <Tooltip/>
                </PieChart>
                </ResponsiveContainer>
                    <h4 className="txtTitle">Subscription Details</h4>
                    <div className='mt-5'>
                        {ticketData.map((s, i) => (
                            <div key={s.name} className='subType d-flex flex-row justify-content-between'>
                            <div>
                                <span className="legend-dot" style={{ background: s.color }} />
                                <span className='txtLabel'>{s.no_of_stations}</span>
                            </div>
                            <div className='txtLabel' style={{color: s.color}}>{s.price} EGP</div>
                            <div className='txtLabel' style={{color: s.color}}>{s.value}%</div>
                            </div>
                    ))}
                    </div>
                    </Col>

                    <Col xs={12} md={6}>
                    <Container className='mt-5'>
                    <h4 className="txtTitle">Ticket Sales</h4>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={subData} className='mt-3'>
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
                    </Col>

                </Row>
        </Container>
    )
}

export default BodySection
