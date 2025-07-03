import { SeatType } from '@/data/type'
import React from 'react'

interface SeatTypeLengendProps {
    seatType: SeatType
}

const SeatTypeLengend = ({ seatType }: SeatTypeLengendProps) => {
    return (
        <div className="flex items-center gap-1">
            <span className="size-3.5 rounded" style={{ backgroundColor: seatType.color }}></span>
            <span className="text-sm">{seatType.name}</span>
        </div>
    )
}

export default SeatTypeLengend