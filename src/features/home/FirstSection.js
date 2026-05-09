import React, { memo, useEffect, useState } from 'react'
import '../../styles/HomeStyle.css'
import '../../styles/StylePages.css'
import { Alert, Card, CardGroup } from 'react-bootstrap'
import { StationController } from '../../controllers/StationController';

const LINE_COLORS = {
    1: 'danger',   // 🔴
    2: 'primary',  // 🔵 
    3: 'success',  // 🟢 
};

const getColor = (line) => LINE_COLORS[line.line_number] || 'secondary';

function FirstSection() {
    let adminName = localStorage.getItem('name') || 'Unkown';
    const [line, setLine] = useState([]);
    const { stationsCount } = StationController();

        const countOfStations = async () => {
            try{
                const data = await stationsCount();
                // console.log("data count: ", data);
                setLine(data);
            }catch(err){
                console.error(err);
            } 
        }

        useEffect(() => {
            countOfStations();
        }, []);

    return (
        <div>
            <Alert className='welcome d-flex align-items-center gap-2 shadow-sm mb-4'>
                <span className='welcome'>
                Welcome {adminName} to metro dashboard.
                </span>
            </Alert>
            <h4 className="txtTitle"> Active lines </h4>
            <CardGroup className="mb-4">
                {
                    line.map((stat) => {
                        return(
                            <Card key={stat.line_number} className="stat-card h-100 shadow-sm">
                        
                            <Card.Body className="d-flex flex-column gap-2 p-3">
                                <div>
                                    <Card.Title className=" mb-1 fs-6 fw-semibold">{stat.name}</Card.Title>
                                    <span className="text-muted" style={{ fontSize: 12 }}>
                                    Line · {stat.line_number}
                                    </span>
                                </div>
                                    <div className="border-top pt-2 mt-1 d-flex align-items-baseline gap-2">
                                        <span className={`text-${getColor(stat)} fw-bold`} style={{ fontSize: 30, lineHeight: 1 }}>
                                        {stat.station_count}
                                        </span>
                                        <span className="text-muted" style={{ fontSize: 12 }}>stations</span>
                                    </div>
                            </Card.Body>
                            </Card>
                        );
                    })}
            </CardGroup>
        </div>
    )
}

export default memo(FirstSection)
