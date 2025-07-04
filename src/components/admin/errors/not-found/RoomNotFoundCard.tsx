import { Card } from '@/components/ui/card'
import React from 'react'

const RoomNotFoundCard = () => {
    return (
        <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Phòng chiếu không tồn tại</h1>
            <p className="text-muted-foreground mb-6">
                Không tìm thấy thông tin phòng chiếu cho rạp này.
            </p>
        </Card>
    )
}

export default RoomNotFoundCard