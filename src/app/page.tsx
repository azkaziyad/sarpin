import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sarpras Inventory
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistem manajemen inventaris barang sarpras yang lengkap dan mudah digunakan untuk sekolah.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-3">
              Masuk ke Sistem
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Lengkap</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Monitor inventaris dan aktivitas peminjaman secara real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lihat statistik barang, peminjaman aktif, dan laporan ringkasan.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Riwayat Peminjaman</CardTitle>
                <CardDescription>Pantau semua aktivitas peminjaman barang</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cari, filter, dan lihat riwayat lengkap peminjaman dengan detail lengkap.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Manajemen Data</CardTitle>
                <CardDescription>Kelola data barang dengan mudah</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tambah, edit, hapus, dan lihat data inventaris barang sarpras.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Interface Elegan</CardTitle>
                <CardDescription>Desain hitam putih yang elegan dan modern</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Antarmuka yang bersih dan mudah digunakan dengan tema monochrome.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Responsif</CardTitle>
                <CardDescription>Berfungsi optimal di semua perangkat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Akses sistem dari desktop, tablet, atau smartphone dengan tampilan yang adaptif.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Keamanan</CardTitle>
                <CardDescription>Login aman untuk melindungi data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sistem autentikasi yang aman untuk mengontrol akses ke data inventaris.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Mulai Kelola Inventaris Anda</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Bergabunglah dengan sistem manajemen inventaris yang efisien dan mudah digunakan.
          </p>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Login Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
