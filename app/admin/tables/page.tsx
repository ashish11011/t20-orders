import { getTables, deleteTable } from "../actions/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function TablesPage() {
    const tables = await getTables();

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

            <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tables.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    No tables found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            tables.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-medium">{t.id}</TableCell>
                                    <TableCell>{t.name}</TableCell>
                                    <TableCell>
                                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={`/admin/tables/form?id=${t.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                "use server";
                                                await deleteTable(t.id);
                                            }}>
                                                <Button type="submit" variant="destructive" size="icon">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
