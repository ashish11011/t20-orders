import { getDishes, deleteDish } from "../actions/dish";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getImageUrl } from "@/lib/s3";
import { DeleteDishButton } from "@/components/delete-dish-button";

export default async function DishesPage() {
    const dishes = await getDishes();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dishes</h1>
                <Button asChild>
                    <Link href="/admin/dishes/form">
                        <Plus className="mr-2 h-4 w-4" /> Add Dish
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dishes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    No dishes found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            dishes.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell className="font-medium">{d.id}</TableCell>
                                    <TableCell>
                                        {d.imageUrl ? (
                                            <img src={getImageUrl(d.imageUrl)} alt={d.name} className="w-12 h-12 rounded object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">No Image</div>
                                        )}
                                    </TableCell>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>Rs. {d.price}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={`/admin/dishes/form?id=${d.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Link>
                                            </Button>
                                            <DeleteDishButton id={d.id} />
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
