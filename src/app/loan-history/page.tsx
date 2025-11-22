
"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoanData } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function LoanHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [loanHistory, setLoanHistory] = useState<LoanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoans() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
  .from<'loans', LoanData>('loans')
  .select('*');

        if (error) throw error;
        if (data) {
          setLoanHistory(data);
        }
      } catch (error: any) {
        setError(error.message || "Gagal mengambil data peminjaman");
        setLoanHistory([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLoans();
  }, []);

  const filteredLoans = loanHistory.filter((loan: LoanData) => {
    const matchesSearch =
      loan.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                  disabled={loading}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "Semua" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Semua")}
                  size="sm"
                  disabled={loading}
                >
                  Semua
                </Button>
                <Button
                  variant={statusFilter === "Aktif" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Aktif")}
                  size="sm"
                  disabled={loading}
                >
                  Aktif
                </Button>
                <Button
                  variant={statusFilter === "Dikembalikan" ? "default" : "outline"}
                  onClick={() => setStatusFilter("Dikembalikan")}
                  size="sm"
                  disabled={loading}
                >
                  Dikembalikan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 font-semibold">
            {error}
          </div>
        )}

        {/* Loading Message */}
        {loading ? (
          <div className="text-center py-8">Memuat data peminjaman...</div>
        ) : (
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
                    <TableCell>{loan.borrowdate ? new Date(loan.borrowdate).toLocaleDateString() : ""}</TableCell>
                    <TableCell>{loan.returndate ? new Date(loan.returndate).toLocaleDateString() : "-"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            loan.status === "Aktif"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {loan.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
