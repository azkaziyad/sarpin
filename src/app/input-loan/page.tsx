"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveLoan } from "@/lib/utils";

// Mock items
const availableItems = [
  { id: 1, name: "Proyektor Epson", available: 3 },
  { id: 2, name: "Laptop Dell", available: 8 },
  { id: 3, name: "Speaker JBL", available: 6 },
  { id: 4, name: "Mikroskop", available: 10 },
  { id: 5, name: "Whiteboard Marker", available: 45 },
];

export default function InputLoanPage() {
  const [formData, setFormData] = useState({
    itemId: "",
    borrower: "",
    borrowDate: "",
    expectedReturnDate: "",
    quantity: 1,
    purpose: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedItem = availableItems.find(item => item.id.toString() === formData.itemId);
    if (!selectedItem) {
      alert("Barang tidak ditemukan!");
      return;
    }

    // Save the loan data
    saveLoan({
      item: selectedItem.name,
      borrower: formData.borrower,
      borrowDate: formData.borrowDate,
      expectedReturnDate: formData.expectedReturnDate,
      quantity: formData.quantity,
      purpose: formData.purpose,
    });

    console.log("Loan submitted:", formData);
    alert("Peminjaman berhasil dicatat!");
    setFormData({
      itemId: "",
      borrower: "",
      borrowDate: "",
      expectedReturnDate: "",
      quantity: 1,
      purpose: "",
    });
  };

  const selectedItem = availableItems.find(item => item.id.toString() === formData.itemId);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Peminjaman Barang</h1>
          <p className="text-muted-foreground mt-2">
            Catat peminjaman barang sarpras
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Form Peminjaman</CardTitle>
            <CardDescription>
              Isi detail peminjaman barang dengan lengkap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="item">Barang</Label>
                  <Select value={formData.itemId} onValueChange={(value: string) => setFormData({ ...formData, itemId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih barang" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableItems.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name} (Tersedia: {item.available})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borrower">Peminjam</Label>
                  <Input
                    id="borrower"
                    placeholder="Nama peminjam"
                    value={formData.borrower}
                    onChange={(e) => setFormData({ ...formData, borrower: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borrowDate">Tanggal Pinjam</Label>
                  <Input
                    id="borrowDate"
                    type="date"
                    value={formData.borrowDate}
                    onChange={(e) => setFormData({ ...formData, borrowDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedReturnDate">Tanggal Pengembalian (Estimasi)</Label>
                  <Input
                    id="expectedReturnDate"
                    type="date"
                    value={formData.expectedReturnDate}
                    onChange={(e) => setFormData({ ...formData, expectedReturnDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Jumlah</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedItem?.available || 1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    required
                  />
                  {selectedItem && (
                    <p className="text-sm text-muted-foreground">
                      Maksimal: {selectedItem.available}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Keperluan</Label>
                  <Input
                    id="purpose"
                    placeholder="Tujuan peminjaman"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Catat Peminjaman
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
