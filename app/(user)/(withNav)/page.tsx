import { QrCode, ShoppingBag, UtensilsCrossed, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container px-3 mx-auto py-6 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold mt-6">Welcome 👋</h1>
        <p className="text-muted-foreground">
          Order your favorite food in just a few taps
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 grid-cols-2">
        <Link href="/qr">
          <Card className="hover:shadow-md transition">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <QrCode className="h-12 w-12 text-primary" />
              <div className="text-center">
                <h2 className="font-semibold text-lg">Scan QR Code</h2>
                <p className="text-sm text-muted-foreground">
                  Scan a table QR and start ordering.
                </p>
              </div>
              <Button className="w-full">
                Scan QR Code
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/takeaway">
          <Card className="hover:shadow-md transition">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <ShoppingBag className="h-12 w-12 text-primary" />
              <div className="text-center">
                <h2 className="font-semibold text-lg">Takeaway</h2>
                <p className="text-sm text-muted-foreground">
                  Order now and pick it up later.
                </p>
              </div>
              <Button className="w-full">
                Order Takeaway
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Features */}
      {/* <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <UtensilsCrossed className="h-5 w-5" />
            <span className="text-sm">Freshly Prepared</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Fast Service</span>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}