import { CartSnak } from "@/components/cartSnak";
import { ClientMenu } from "@/components/client-menu";
import { Header } from "@/components/header";
import { getCachedMenu } from "../actions/home";

export default async function Home() {
  const data = await getCachedMenu();

  // console.log(data);

  return (
    <div className=" flex flex-col">
      <Header />
      <ClientMenu initialDishes={data} />
      <CartSnak />
    </div>
  );
}