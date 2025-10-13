import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Tentang Sarpras Inventory</h1>
          <p className="text-muted-foreground text-center mt-2">
            Sistem manajemen inventaris barang sarpras yang efisien
          </p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Deskripsi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aplikasi Sarpras Inventory adalah sistem berbasis web yang digunakan untuk mengelola data sarana dan prasarana secara efisien dan terorganisir.
                Melalui aplikasi ini pengguna dapat mencatat, mengedit, dan memantau data aset seperti nama barang, jumlah, dan kondisi. Dengan tampilan yang sederhana dan mudah digunakan, aplikasi ini membantu mempermudah proses pendataan, pemeliharaan, dan pengawasan aset agar lebih efektif dan transparan.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Fitur Utama</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Dashboard interaktif dengan statistik real-time</li>
                <li>Sistem peminjaman dan pengembalian barang</li>
                <li>Riwayat peminjaman lengkap dengan filter dan pencarian</li>
                <li>Input peminjaman barang dengan detail</li>
                <li>Sistem autentikasi untuk keamanan data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Teknologi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dibangun menggunakan Next.js 15, React 19, dan Tailwind CSS v4,
                dengan komponen UI dari Shadcn UI.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                email: support@sarpras.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
