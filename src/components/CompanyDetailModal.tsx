import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  Label,
} from "recharts";
import { Company } from "@/app/types";

interface CompanyDetailsModalProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  company,
  isOpen,
  onClose,
}) => {
  if (!company) return null;

  // Transform period data for charts
  const transformPeriodData = () => {
    return (["I", "II", "III", "IV"] as const).map((period) => ({
      periode: period,
      monoTarget: company.monokulturTargets?.[period],
      monoAchievement: company.monokulturAchievements?.[period],
      tsTarget: company.tumpangSariTargets?.[period],
      tsAchievement: company.tumpangSariAchievements?.[period],
      csrAchievement: company.csrAchievements?.[period],
    }));
  };

  const periodData = transformPeriodData();

  // Data for pie chart
  const targetDistribution = [
    {
      name: "Target Mono 2%",
      value: company.target2Percent,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Target TS 7%",
      value: company.target7Percent,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Lahan Yang Tersisa",
      value:
        typeof company.target2Percent === "number" &&
        typeof company.target7Percent === "number"
          ? company.area - (company.target2Percent + company.target7Percent)
          : undefined,
      fill: "hsl(var(--chart-3))",
    },
  ];
  const totalArea = company.area;

  // const renderProgressSection = (
  //   title: string,
  //   data: {
  //     targetTanam: { luas: number; persentase: number };
  //     waktuTanam: string;
  //     progresTanam: { luas: number; persentase: number };
  //     belumTanam: { luas: number; persentase: number };
  //     panen: { luas: number; persentase: number };
  //     keterangan: string;
  //   }
  // ) => {
  //   const progressData = [
  //     {
  //       name: "Sudah Tanam",
  //       value: data.progresTanam.persentase,
  //       luas: data.progresTanam.luas,
  //       fill: "#22c55e"
  //     },
  //     {
  //       name: "Belum Tanam",
  //       value: data.belumTanam.persentase,
  //       luas: data.belumTanam.luas,
  //       fill: "#ef4444"
  //     },
  //     {
  //       name: "Panen",
  //       value: data.panen.persentase,
  //       luas: data.panen.luas,
  //       fill: "#eab308"
  //     }
  //   ];

  //   return (
  //     <Card className="w-full">
  //       <CardHeader>
  //         <CardTitle className="text-sm font-medium text-gray-500">
  //           Progress {title}
  //         </CardTitle>
  //         <CardDescription>
  //           Target Tanam: {data.targetTanam.luas.toFixed(2)} Ha ({data.targetTanam.persentase.toFixed(2)}%)
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div className="h-[300px]">
  //             <ResponsiveContainer width="100%" height="100%">
  //               <PieChart>
  //                 <Pie
  //                   data={progressData}
  //                   dataKey="value"
  //                   nameKey="name"
  //                   cx="50%"
  //                   cy="50%"
  //                   innerRadius={60}
  //                   outerRadius={80}
  //                   label
  //                 />
  //                 <Tooltip
  //                   content={({ active, payload }) => {
  //                     if (active && payload && payload.length) {
  //                       const data = payload[0].payload;
  //                       return (
  //                         <div className="rounded-lg border bg-background p-2 shadow-sm">
  //                           <div className="grid grid-cols-2 gap-2">
  //                             <div className="flex flex-col">
  //                               <span className="text-[0.70rem] uppercase text-muted-foreground">
  //                                 {data.name}
  //                               </span>
  //                               <span className="font-bold">
  //                                 {data.value.toFixed(2)}% ({data.luas.toFixed(2)} Ha)
  //                               </span>
  //                             </div>
  //                           </div>
  //                         </div>
  //                       );
  //                     }
  //                     return null;
  //                   }}
  //                 />
  //                 <Legend />
  //               </PieChart>
  //             </ResponsiveContainer>
  //           </div>
  //           <div className="flex flex-col gap-4">
  //             <div className="flex items-center gap-2">
  //               <Calendar className="h-4 w-4 text-gray-500" />
  //               <span className="text-sm">Waktu Tanam: {data.waktuTanam}</span>
  //             </div>
  //             <div className="space-y-3">
  //               <div className="flex justify-between text-sm">
  //                 <span className="text-muted-foreground">Sudah Tanam</span>
  //                 <span className="font-medium">{data.progresTanam.luas.toFixed(2)} Ha ({data.progresTanam.persentase.toFixed(2)}%)</span>
  //               </div>
  //               <div className="flex justify-between text-sm">
  //                 <span className="text-muted-foreground">Belum Tanam</span>
  //                 <span className="font-medium">{data.belumTanam.luas.toFixed(2)} Ha ({data.belumTanam.persentase.toFixed(2)}%)</span>
  //               </div>
  //               <div className="flex justify-between text-sm">
  //                 <span className="text-muted-foreground">Panen</span>
  //                 <span className="font-medium">{data.panen.luas.toFixed(2)} Ha ({data.panen.persentase.toFixed(2)}%)</span>
  //               </div>
  //             </div>
  //             <div className="mt-4">
  //               <h4 className="text-sm font-medium mb-2">Keterangan:</h4>
  //               <p className="text-sm text-muted-foreground">{data.keterangan}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            {company.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress Mono & TS</TabsTrigger>
            <TabsTrigger value="csr">CSR</TabsTrigger>
            <TabsTrigger value="ProgressTanam">Progress Tanam</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="items-center pb-0">
                  <CardTitle className="text-sm font-medium">
                    Total Lahan
                  </CardTitle>
                  <CardDescription>Distribusi Target Area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        {payload[0].name}
                                      </span>
                                      <span className="font-bold text-muted-foreground">
                                        {(
                                          Number(payload[0]?.value) ?? 0
                                        ).toFixed(2)}{" "}
                                        Ha
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={targetDistribution}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={80}
                          strokeWidth={5}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {totalArea.toFixed(2)}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Total (Ha)
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <div className="w-full grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-1))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Target Mono 2%
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.target2Percent?.toFixed(2)} Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-2))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Target TS 7%
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.target7Percent?.toFixed(2)} Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-3))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Lahan Yang Tersisa
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(
                          company.area -
                          (company.target2Percent ?? 0 + (company.target7Percent ?? 0))
                        ).toFixed(2)}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                  <div className="w-full pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total Area
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.area.toFixed(2)} Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Target Monokultur dan Tumpang Sari
                  </CardTitle>
                  <CardDescription>Progress per Periode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={periodData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="periode"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <YAxis />
                        <Tooltip
                          cursor={false}
                          contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            padding: "8px",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="monoTarget"
                          name="Target Mono 2%"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="tsTarget"
                          name="Target TS 7%"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    <Target className="h-4 w-4" />
                    Target Total:{" "}
                    {(company.area - (company.target2Percent ?? 0 + (company.target7Percent ?? 0))).toFixed(2)}
                    Ha
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Progress Monokultur per Periode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={periodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periode" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="monoAchievement"
                          name="Pencapaian"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="monoTarget"
                          name="Target"
                          stroke="#22c55e"
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    <Target className="h-4 w-4" />
                    Total Target Monokultur: {company.target2Percent?.toFixed(2)} Ha
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Progress Tumpang Sari per Periode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={periodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periode" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="tsAchievement"
                          name="Pencapaian"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="tsTarget"
                          name="Target"
                          stroke="#8b5cf6"
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    <Target className="h-4 w-4" />
                    Total Target Tumpang Sari: {company.target7Percent?.toFixed(2)} Ha
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="csr">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Progress CSR per Periode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={periodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periode" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="csrAchievement"
                        name="Pencapaian"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="csrTarget"
                        name="Target"
                        stroke="red"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  <Target className="h-4 w-4" />
                  Total Capaian CSR: {Object.values(company.csrAchievements || {}).reduce((acc, val) => acc + val, 0).toFixed(2)} Ha
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* <TabsContent value="ProgressTanam">
            <div className="space-y-4">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Informasi Penanggung Jawab
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">PJ: {company.progress?.namaPJ}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Telp: {company.progress?.nomorTelp}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {company.progress?.monokultur && 
                renderProgressSection("Monokultur", company.progress.monokultur)}
              
              {company.progress?.tumpangSari && 
                renderProgressSection("Tumpang Sari", company.progress.tumpangSari)}
              
              {company.progress?.csr && 
                renderProgressSection("CSR", company.progress.csr)}
            </div>
          </TabsContent> */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetailsModal;