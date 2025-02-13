"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2, Map, Target, TargetIcon, TrendingUp } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Company, PolresData } from "../types";
import { datapolres } from "../Data/PolresData";

const pinIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>`;

const customIcon = L.divIcon({
  className: "custom-marker",
  html: `<div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors">
    ${pinIconSvg}
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const RiauDashboard = () => {
  const [selectedPolres, setSelectedPolres] = useState<PolresData | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

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

  const getQuarterlyData = (company: Company | null) => {
    if (!company) {
      if (!selectedPolres) return [];
      // If no company selected, show aggregate data for the polres
      const achievement = selectedPolres.companies.reduce(
        (acc, company) => ({
          Q1: acc.Q1 + company.achievement.Q1,
          Q2: acc.Q2 + company.achievement.Q2,
          Q3: acc.Q3 + company.achievement.Q3,
          Q4: acc.Q4 + company.achievement.Q4,
        }),
        {
          Q1: 0,
          Q2: 0,
          Q3: 0,
          Q4: 0,
        }
      );
      return Object.entries(achievement).map(([quarter, value]) => ({
        name: quarter,
        total: value / selectedPolres.companies.length, // Average across companies
      }));
    }

    // Return data for specific company
    return Object.entries(company.achievement).map(([quarter, value]) => ({
      name: quarter,
      total: value,
      target2Percent: company.target2Percent,
      target7Percent: company.target7Percent,
    }));
  };

  const stats = getTotalStats();

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company === selectedCompany ? null : company);
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
                  <MapContainer
                    center={[0.5070677, 101.5401725]}
                    zoom={8}
                    className="w-full h-full"
                    zoomControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
                    />
                    {datapolres.map((polres) => (
                      <Marker
                        key={polres.id}
                        position={polres.coordinates}
                        icon={customIcon}
                        eventHandlers={{
                          click: () => {
                            setSelectedPolres(polres);
                            setSelectedCompany(null);
                          },
                        }}
                      >
                        <Popup className="rounded-xl shadow-xl bg-white">
                          <div className="p-4">
                            {/* Header */}
                            <h3 className="font-bold text-lg mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                              {polres.nama}
                            </h3>

                            <div className="space-y-3">
                              {/* Companies Badge */}
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                                >
                                  {polres.companies.length} Perusahaan
                                </Badge>
                              </div>

                              {/* Area Info */}
                              <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                                <span className="text-sm text-gray-600">
                                  Luas Lahan:
                                </span>
                                <span className="font-bold text-gray-900">
                                  {polres.totalArea} Ha
                                </span>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
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
                  <div className="p-4">
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
                              Target7%
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

        {/* Achievement Chart Section */}
        <Card className="col-span-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Capaian per Triwulan
              {selectedCompany && (
                <span className="text-sm text-gray-500 ml-2">
                  - {selectedCompany.name}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {selectedCompany
                ? `Progress pencapaian target per triwulan untuk ${selectedCompany.name}`
                : "Progress pencapaian target rata-rata per triwulan"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPolres ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getQuarterlyData(selectedCompany)}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <TrendingUp className="w-12 h-12 mb-4 opacity-50" />
                <p>Pilih kabupaten untuk melihat capaian</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiauDashboard;
