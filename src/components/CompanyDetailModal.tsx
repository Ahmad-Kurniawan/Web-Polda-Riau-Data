import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Target, TrendingUp } from "lucide-react";
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
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Company } from '@/app/types';


const CompanyDetailsModal = ({ company, isOpen, onClose }: { company: Company, isOpen: boolean, onClose: () => void }) => {
  if (!company) return null;

  // Calculate monthly targets based on yearly targets
  const monthlyData = Array.from({ length: 4 }, (_, i) => ({
    month: ['I','II','III','IV'][i],
    target2Percent: company.target2Percent / 4,
    target7Percent: company.target7Percent / 4,
    progress: Math.random() * (company.target2Percent / 4), // Simulated progress data
  }));

  // Data for pie chart
  const targetDistribution = [
    { name: 'Target Mono 2%', value: company.target2Percent },
    { name: 'Target TS 7%', value: company.target7Percent },
    { name: 'Lahan Yang Tersisa', value: company.area - (company.target2Percent + company.target7Percent) }
  ];

  const COLORS = ['#22c55e', '#8b5cf6', '#94a3b8'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            {company.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Lahan 
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={targetDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {targetDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Target Monokultur dan Tumpang Sari
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="target2Percent" name="Target Mono 2%" fill="#22c55e" />
                        <Bar dataKey="target7Percent" name="Target TS 7%" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="progress" 
                        name="Actual Progress" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target2Percent" 
                        name="Target 2%" 
                        stroke="#22c55e" 
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Land Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          category: 'Area Distribution',
                          remaining: company.area - (company.target2Percent + company.target7Percent),
                          target2Percent: company.target2Percent,
                          target7Percent: company.target7Percent,
                        }
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="target2Percent" name="Target 2%" stackId="a" fill="#22c55e" />
                      <Bar dataKey="target7Percent" name="Target 7%" stackId="a" fill="#8b5cf6" />
                      <Bar dataKey="remaining" name="Remaining Area" stackId="a" fill="#94a3b8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetailsModal;