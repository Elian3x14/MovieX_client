import React from 'react';
import { CreditCard, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PaymentData {
    bookingId: string;
    totalAmount: number;
    ticketPrice: number;
    serviceFee: number;
    discount: number;
    paymentMethod: string;
    cardNumber: string;
    transactionId: string;
}

interface PaymentDetailsProps {
    paymentData: PaymentData;
}

const PaymentDetails = ({ paymentData }: PaymentDetailsProps) => {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + ' đ';
    };

    return (
        <Card className=" shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Chi tiết thanh toán
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mã đặt vé:</span>
                        <span className="font-medium font-mono">{paymentData.bookingId}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mã giao dịch:</span>
                        <span className="font-medium font-mono">{paymentData.transactionId}</span>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Giá vé:</span>
                            <span>{formatCurrency(paymentData.ticketPrice)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Phí dịch vụ:</span>
                            <span>{formatCurrency(paymentData.serviceFee)}</span>
                        </div>

                        <div className="flex justify-between text-sm text-green-600">
                            <span>Giảm giá:</span>
                            <span>-{formatCurrency(paymentData.discount)}</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold text-lg">
                            <span>Tổng cộng:</span>
                            <span className="text-green-600">{formatCurrency(paymentData.totalAmount)}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="w-4 h-4 text-green-600" />
                            <span className="text-muted-foreground">Phương thức:</span>
                            <span className="font-medium">{paymentData.paymentMethod}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Số thẻ:</span>
                            <span className="font-mono">{paymentData.cardNumber}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-2 bg-green-100 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 text-center">
                        Thanh toán đã được xử lý  <strong>Thành công!</strong>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaymentDetails;
