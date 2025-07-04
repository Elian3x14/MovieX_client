import { Card } from '@/components/ui/card';
import React from 'react'

const CinemaNotFoundCard = () => {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rạp chiếu không tồn tại</h1>
      <p className="text-muted-foreground mb-6">
        Không tìm thấy thông tin rạp chiếu này. Vui lòng kiểm tra lại hoặc liên hệ quản trị viên.
      </p>
    </Card>
  );
}

export default CinemaNotFoundCard