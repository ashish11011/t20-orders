import { getCategory, createCategory, updateCategory } from "../../actions/category";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default async function CategoryFormPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>;
}) {
    const resolvedParams = await searchParams;
    const isEdit = !!resolvedParams?.id;
    const categoryId = isEdit ? parseInt(resolvedParams.id!, 10) : null;

    const category = isEdit && categoryId ? await getCategory(categoryId) : null;

    async function handleSubmit(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;

        if (isEdit && categoryId) {
            await updateCategory(categoryId, { name });
        } else {
            await createCategory({ name });
        }

        redirect("/admin/categories");
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/categories">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">
                    {isEdit ? "Edit Category" : "Add Category"}
                </h1>
            </div>

            <div className="rounded-md border bg-card text-card-foreground p-6 shadow-sm">
                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={category?.name || ""}
                            required
                            placeholder="e.g. Main Course"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/admin/categories">Cancel</Link>
                        </Button>
                        <Button type="submit">
                            {isEdit ? "Update Category" : "Save Category"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
