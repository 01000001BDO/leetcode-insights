"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeetCodeStatsVisualizationProps {
  stats: {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
  }
}

export function LeetCodeStatsVisualization({ stats }: LeetCodeStatsVisualizationProps) {
  const difficultyData = [
    { 
      name: 'Easy', 
      solved: stats.easySolved, 
      total: stats.totalEasy,
      percentage: ((stats.easySolved / stats.totalEasy) * 100).toFixed(2)
    },
    { 
      name: 'Medium', 
      solved: stats.mediumSolved, 
      total: stats.totalMedium,
      percentage: ((stats.mediumSolved / stats.totalMedium) * 100).toFixed(2)
    },
    { 
      name: 'Hard', 
      solved: stats.hardSolved, 
      total: stats.totalHard,
      percentage: ((stats.hardSolved / stats.totalHard) * 100).toFixed(2)
    }
  ];

  const COLORS = ['#4caf50', '#ff9800', '#f44336'];
  const BarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p>{`${data.name}: ${data.solved} / ${data.total}`}</p>
          <p>{`Percentage: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };
  const pieChartData = difficultyData.map(item => ({
    name: item.name,
    value: item.solved
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Problem Solving Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="solved" fill="#8884d8">
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Solved Problems Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Additional Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Problems Solved</p>
            <p className="text-2xl font-bold">
              {stats.totalSolved} / {stats.totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
            <p className="text-2xl font-bold">
              {((stats.totalSolved / stats.totalQuestions) * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Acceptance Rate</p>
            <p className="text-2xl font-bold">
              {(stats.acceptanceRate * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold">
              {((stats.totalSolved / stats.totalQuestions) * 100).toFixed(0)}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}