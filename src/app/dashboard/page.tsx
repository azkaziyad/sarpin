import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const stats = [
  { title: "Total Barang", value: "156", description: "Barang terdaftar dalam sistem" },
  { title: "Barang Dipinjam", value: "23", description: "Sedang dalam peminjaman" },
  { title: "Peminjaman Bulan Ini", value: "45", description: "Total peminjaman bulan ini" },
  { title: "Barang Tersedia", value: "133", description: "Barang siap dipinjam" },
];

const recentLoans = [
  { id: 1, item: "Proyektor Epson", borrower: "Kelas X RPL A", date: "2025-10-10", status: "Aktif" },
  { id: 2, item: "Laptop Dell", borrower: "Guru Matematika", date: "2024-10-10", status: "Aktif" },
  { id: 3, item: "Speaker JBL", borrower: "Kelas XI RPL B", date: "2025-10-11", status: "Dikembalikan" },
  { id: 4, item: "Mikroskop", borrower: "Lab Komputer", date: "2025-10-12", status: "Aktif" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Ringkasan inventaris dan aktivitas peminjaman
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Loans */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Aktivitas Peminjaman Terbaru</CardTitle>
            <CardDescription>
              Peminjaman barang dalam 7 hari terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLoans.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium">{loan.item}</h3>
                    <p className="text-sm text-muted-foreground">
                      Dipinjam oleh: {loan.borrower}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tanggal: {loan.date}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    loan.status === "Aktif"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {loan.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
