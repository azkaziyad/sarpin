"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLoans, LoanData } from "@/lib/utils";

// Mock data
const mockLoanHistory: LoanData[] = [
  { id: 1, item: "Proyektor Epson", borrower: "Kelas 10A", borrowDate: "2024-01-10", returnDate: "2024-01-15", status: "Dikembalikan", expectedReturnDate: "2024-01-15", quantity: 1, purpose: "Presentasi" },
  { id: 2, item: "Laptop Dell", borrower: "Guru Matematika", borrowDate: "2024-01-08", returnDate: "2024-01-14", status: "Dikembalikan", expectedReturnDate: "2024-01-14", quantity: 1, purpose: "Mengajar" },
  { id: 3, item: "Speaker JBL", borrower: "Kelas 11B", borrowDate: "2024-01-05", returnDate: "2024-01-13", status: "Dikembalikan", expectedReturnDate: "2024-01-13", quantity: 1, purpose: "Acara kelas" },
  { id: 4, item: "Mikroskop", borrower: "Lab Biologi", borrowDate: "2024-01-12", returnDate: undefined, status: "Aktif", expectedReturnDate: "2024-01-20", quantity: 1, purpose: "Praktikum" },
  { id: 5, item: "Whiteboard Marker", borrower: "Kelas 9C", borrowDate: "2024-01-11", returnDate: "2024-01-11", status: "Dikembalikan", expectedReturnDate: "2024-01-11", quantity: 5, purpose: "Materi ajar" },
  { id: 6, item: "Kamera DSLR", borrower: "Kegiatan Ekstrakurikuler", borrowDate: "2024-01-09", returnDate: undefined, status: "Aktif", expectedReturnDate: "2024-01-16", quantity: 1, purpose: "Dokumentasi" },
];

export default function LoanHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [loanHistory, setLoanHistory] = useState<LoanData[]>([]);

  useEffect(() => {
    const savedLoans = getLoans();
    // Combine saved loans with mock data, but prioritize saved loans
    const combinedLoans = [...mockLoanHistory, ...savedLoans];
    setLoanHistory(combinedLoans);
  }, []);

  const filteredLoans = loanHistory.filter((loan: LoanData) => {
    const matchesSearch = loan.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.borrower.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Semua" || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Riwayat Peminjaman</h1>
          <p className="text-muted-foreground mt-2">
            Lihat semua aktivitas peminjaman barang sarpras
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle>Filter dan Pencarian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Cari berdasarkan nama barang atau peminjam..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "Semua" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Semua")}
                  size="sm"
                >
                  Semua
                </Button>
                <Button
                  variant={statusFilter === "Aktif" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Aktif")}
                  size="sm"
                >
                  Aktif
                </Button>
                <Button
                  variant={statusFilter === "Dikembalikan" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Dikembalikan")}
                  size="sm"
                >
                  Dikembalikan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Daftar Peminjaman</CardTitle>
            <CardDescription>
              Menampilkan {filteredLoans.length} dari {loanHistory.length} peminjaman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barang</TableHead>
                  <TableHead>Peminjam</TableHead>
                  <TableHead>Tanggal Pinjam</TableHead>
                  <TableHead>Tanggal Kembali</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.item}</TableCell>
                    <TableCell>{loan.borrower}</TableCell>
                    <TableCell>{loan.borrowDate}</TableCell>
                    <TableCell>{loan.returnDate || "-"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        loan.status === "Aktif"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {loan.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
