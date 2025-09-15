// components/dialogs/ConfirmDeleteDialog.tsx

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    objectName?: string; // ví dụ: "phim Avengers"
}

export const ConfirmDeleteDialog = ({ open, onClose, onConfirm, objectName }: ConfirmDeleteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                </DialogHeader>
                <div>
                    Bạn có chắc chắn muốn xóa <strong>{objectName ?? "đối tượng này"}</strong> không? Hành động này không thể hoàn tác.
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>Không, giữ lại</Button>
                    <Button variant="destructive" onClick={onConfirm}>Có! Xóa luôn</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
