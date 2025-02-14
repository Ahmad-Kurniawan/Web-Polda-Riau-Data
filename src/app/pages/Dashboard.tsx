"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2, Map, Target, TargetIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Company, PolresData } from "../types";
import { datapolres } from "../Data/PolresData";
import CompanyDetailsModal from "@/components/CompanyDetailModal";

// Import Map component secara dinamis
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">
      <p>Loading map...</p>
    </div>
  )
});

const RiauDashboard = () => {
  const [selectedPolres, setSelectedPolres] = useState<PolresData | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalStats = () => {
    return datapolres.reduce(
      (acc, polres) => ({
        totalArea: acc.totalArea + polres.totalArea,
        monokulturTarget: acc.monokulturTarget + polres.monokulturTarget,
        tumpangSariTarget: acc.tumpangSariTarget + polres.tumpangSariTarget,
        totalTarget: acc.totalTarget + polres.totalTarget,
      }),
      {
        totalArea: 0,
        monokulturTarget: 0,
        tumpangSariTarget: 0,
        totalTarget: 0,
      }
    );
  };

  const stats = getTotalStats();

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handlePolresSelect = (polres: PolresData) => {
    setSelectedPolres(polres);
    setSelectedCompany(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Wilayah Riau
          </h1>
          <p className="text-gray-500 mt-1">
            Overview statistik dan data perusahaan di wilayah Riau
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Luas Lahan
              </CardTitle>
              <Map className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalArea.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">
                Total area di seluruh wilayah
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Target Monokultur
              </CardTitle>
              <Target className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.monokulturTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">2% dari total lahan</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Target Tumpang Sari
              </CardTitle>
              <Target className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.tumpangSariTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">7% dari total lahan</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Target
              </CardTitle>
              <TargetIcon className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-gray-500">
                Kombinasi target monokultur & tumpang sari
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Map and Table Section */}
          <div className="col-span-12 lg:col-span-8">
            {/* Map Card */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-blue-500" />
                  Peta Sebaran Wilayah
                </CardTitle>
                <CardDescription>
                  Klik pada marker untuk melihat detail wilayah
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] relative rounded-b-lg overflow-hidden">
                  <MapComponent 
                    data={datapolres}
                    onPolresSelect={handlePolresSelect}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Table Section */}
          <Card className="col-span-12 lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                {selectedPolres
                  ? `Perusahaan di ${selectedPolres.nama}`
                  : "Daftar Perusahaan"}
              </CardTitle>
              {selectedPolres && (
                <CardDescription>
                  Total {selectedPolres.companies.length} perusahaan terdaftar
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {selectedPolres ? (
                  <div className="p-6">
                    {selectedPolres.companies.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nama Perusahaan</TableHead>
                            <TableHead>Luas Area</TableHead>
                            <TableHead className="text-right">
                              Target 2%
                            </TableHead>
                            <TableHead className="text-right">
                              Target 7%
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedPolres.companies.map((company) => (
                            <TableRow
                              key={company.id}
                              className={`hover:bg-gray-50 cursor-pointer ${
                                selectedCompany?.id === company.id
                                  ? "bg-blue-50"
                                  : ""
                              }`}
                              onClick={() => handleCompanyClick(company)}
                            >
                              <TableCell className="font-medium">
                                {company.name}
                              </TableCell>
                              <TableCell>
                                {company.area.toLocaleString("id-ID", {
                                  maximumFractionDigits: 2,
                                })}
                              </TableCell>
                              <TableCell className="text-right">
                                {company.target2Percent.toLocaleString(
                                  "id-ID",
                                  { maximumFractionDigits: 4 }
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {company.target7Percent.toLocaleString(
                                  "id-ID",
                                  { maximumFractionDigits: 4 }
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <Building2 className="w-12 h-12 mb-4 opacity-50" />
                        <p>Belum ada data perusahaan</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Map className="w-12 h-12 mb-4 opacity-50" />
                    <p>Pilih kabupaten pada peta</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default RiauDashboard;