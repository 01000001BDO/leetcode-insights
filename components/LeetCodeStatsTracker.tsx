"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LeetCodeStatsVisualization } from "@/components/leetcode-stats-visualization";
import { SkillTreeVisualization } from "@/components/SkillTreeVisualization";
import { AlertCircle } from 'lucide-react';

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export default function LeetCodeStatsTracker() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeetCodeStats = async () => {
    if (!username) {
      setError('Please enter a LeetCode username');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStats(null);

    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Failed to fetch stats');
      }

      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-foreground">
            LeetCode Stats Tracker
          </h1>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/JeremyTsaii/leetcode-stats-api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              API Repository
            </a>
            <ModeToggle />
          </div>
        </div>

        <div className="flex space-x-2">
          <Input 
            type="text"
            placeholder="Enter LeetCode Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={fetchLeetCodeStats} disabled={isLoading}>
            {isLoading ? 'Fetching...' : 'Get Stats'}
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((key) => (
              <Skeleton key={key} className="h-24 w-full" />
            ))}
          </div>
        )}

        {stats && (
          <div className="space-y-6">
            <LeetCodeStatsVisualization stats={stats} />
            <SkillTreeVisualization stats={stats} />
          </div>
        )}
      </div>
    </div>
  );
}