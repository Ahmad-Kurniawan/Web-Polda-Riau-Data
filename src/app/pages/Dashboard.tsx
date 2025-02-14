"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Building2, Map, Target, TargetIcon, Sprout } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
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

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">
      <p>Loading map...</p>
    </div>
  ),
});

const MotionCard = motion(Card);

const RiauDashboard = () => {
  const [selectedPolres, setSelectedPolres] = useState<PolresData | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

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
    <motion.div
      className="p-6 bg-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard Wilayah Riau
          </h1>
          <p className="text-gray-600 mt-1">
            Overview statistik dan data perusahaan di wilayah Riau
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              title: "Luas Lahan",
              value: stats.totalArea,
              description: "Total area wilayah",
              icon: Map,
              gradient: "from-purple-400 to-pink-500",
            },
            {
              title: "Target Monokultur",
              value: stats.monokulturTarget,
              description: "2% dari total lahan",
              icon: Sprout,
              gradient: "from-blue-400 to-cyan-500",
            },
            {
              title: "Target Tumpang Sari",
              value: stats.tumpangSariTarget,
              description: "7% dari total lahan",
              icon: Sprout,
              gradient: "from-orange-400 to-pink-500",
            },
            {
              title: "Total Target",
              value: stats.totalTarget,
              description: "Kombinasi target",
              icon: TargetIcon,
              gradient: "from-green-400 to-emerald-500",
            },
          ].map((stat, index) => (
            <MotionCard
              key={index}
              variants={cardVariants}
              className={`bg-gradient-to-r ${stat.gradient} text-white rounded-xl shadow-lg hover:shadow-xl transition-all`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-8 h-8 text-white opacity-80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString("id-ID", {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs opacity-80">{stat.description}</p>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <motion.div
            className="col-span-12 lg:col-span-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Map className="w-5 h-5" />
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
          </motion.div>

          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Building2 className="w-5 h-5" />
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
                          </TableHeader>
                          <TableBody>
                            {selectedPolres.companies.map((company, index) => (
                              <TableRow
                                key={company.id}
                                className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                onClick={() => handleCompanyClick(company)}
                              >
                                <motion.td
                                  variants={tableRowVariants}
                                  initial="hidden"
                                  animate="visible"
                                  transition={{ delay: index * 0.1 }}
                                  className="p-4 font-medium"
                                >
                                  {company.name}
                                </motion.td>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-8 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>Belum ada data perusahaan</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-8 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih kabupaten pada peta</p>
                    </motion.div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </motion.div>
  );
};

export default RiauDashboard;
