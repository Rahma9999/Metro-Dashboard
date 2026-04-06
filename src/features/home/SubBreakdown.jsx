import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const SUBSCRIPTION_TYPES = [
    { name: "Adults", value: 38, color: "#00C2FF" },
    { name: "Students", value: 26, color: "#7C3AED" },
    { name: "Individuals", value: 6, color: "#EF4444" },
];

function SubBreakdown() {
    return (
        <Container className='mt-2 py-2'>
            <Row>
                <Col xs={12} md={6}>
                <h4 className="txtTitle">Subscription Breakdown</h4>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={SUBSCRIPTION_TYPES} outerRadius={85} innerRadius={55} paddingAngle={3} label={({ name, value }) => `${value}%`} dataKey="value">
                    {SUBSCRIPTION_TYPES.map((e, i) => 
                    <Cell key={i} fill={e.color} />
                    )}
                    </Pie>
                    <Tooltip/>
                </PieChart>
                </ResponsiveContainer>
                </Col>
                    <Col xs={12} md={6}>
                    <h4 className="txtTitle">Subscription Details</h4>
                    <div className='mt-5'>
                        {SUBSCRIPTION_TYPES.map((s, i) => (
                            <div key={s.name} className='subType d-flex flex-row justify-content-between'>
                            <div>
                                <span className="legend-dot" style={{ background: s.color }} />
                                <span className='txtLabel'>{s.name}</span>
                            </div>
                            <div className='txtLabel' style={{color: s.color}}>{s.value}%</div>
                            </div>
                    ))}
                    </div>
                    </Col>
                </Row>
        </Container>
    )
}

export default SubBreakdown
