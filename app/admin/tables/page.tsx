import { getTables } from "../actions/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableOrdersDialogClient } from "./TableOrdersDialogClient";
import { DeleteTableButton } from "@/components/delete-table-button";
import { cn } from "@/lib/utils";

export default async function TablesPage() {
    const tables = await getTables();
    // console.log(tables);
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Tables</h1>
                <Button asChild>
                    <Link href="/admin/tables/form">
                        <Plus className="mr-2 h-4 w-4" /> Add Table
                    </Link>
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <Button asChild>
                    <Link href="/admin/orders/form">
                        <Plus className="h-4 w-4 mr-2" /> New Order
                    </Link>
                </Button>
            </div>

            <div className=" w-full grid grid-cols-8 gap-5">
                {tables.map((t) => (
                    <div key={t.id} className={cn("rounded-md duration-200  cursor-pointer aspect-square border bg-card text-card-foreground shadow-sm")}>
                        <TableOrdersDialogClient table={t} />
                    </div>
                ))}
            </div>

        </div>
    );
}


{/* <TableRow key={t.id}>
                                    <TableCell className="font-medium">{t.id}</TableCell>
                                    <TableCell>
                                       
                                    </TableCell>
                                    <TableCell>
                                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={t.isRunning ? "destructive" : "default"}>{ ? "yes" : "no"}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={`/admin/tables/form?id=${t.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Link>
                                            </Button>
                                            <DeleteTableButton id={t.id} />
                                        </div>
                                    </TableCell>
                                </TableRow> */}