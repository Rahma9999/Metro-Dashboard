import React from 'react'
import FirstSection from './FirstSection'
import Map from './Map'
import BodySection from './BodySection'
import SubBreakdown from './SubBreakdown'
import TicketSale from './TicketSale'

function HomePage() {
    return (
        <div>
            <FirstSection />
            <Map />
            <SubBreakdown />
            <TicketSale />
            {/* <BodySection /> */}
        </div>
    )
}

export default HomePage
