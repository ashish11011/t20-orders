"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { payUserLending } from "../../actions/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PayLendingDialogProps {
    userId: number;
    currentLendingAmount: number;
}

export function PayLendingDialog({ userId, currentLendingAmount }: PayLendingDialogProps) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<"paid_online" | "paid_cash">("paid_online");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handlePay = async () => {
        if (amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        
        setIsLoading(true);
        try {
            await payUserLending(userId, amount, paymentMethod);
            toast.success("Payment recorded successfully");
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Payment failed", error);
            toast.error("Failed to record payment");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"xs"} className="cursor-pointer bg-green-700 hover:bg-green-800 text-white">Pay</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pay Lending Amount</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount to Pay</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount || ""}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="Enter amount"
                            max={currentLendingAmount}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="method">Payment Method</Label>
                        <select
                            id="method"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value as "paid_online" | "paid_cash")}
                        >
                            <option value="paid_online">Paid Online</option>
                            <option value="paid_cash">Paid Cash</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handlePay} disabled={isLoading}>
                        {isLoading ? "Processing..." : "OK"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
