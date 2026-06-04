import { CartSnak } from "@/components/cartSnak";
import { ClientMenu } from "@/components/client-menu";
import CategoryMenuSnack from "@/components/CategoryMenuSnack";
import { Suspense } from "react";
import { getCachedMenu } from "@/app/actions/home";

export default async function Home() {
    const data = await getCachedMenu();

    return (
        <div className=" flex flex-col">
            <Suspense>
                <ClientMenu initialDishes={data} />
            </Suspense>
            <CategoryMenuSnack data={data} />
            <CartSnak />
        </div>
    );
}