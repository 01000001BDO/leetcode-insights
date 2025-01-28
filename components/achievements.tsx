"use client";

import React from 'react';
import { 
  Trophy, 
  Target, 
  Star, 
  Award, 
  Hexagon, 
  Code, 
  CheckCircle, 
  Flame 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AchievementsProps {
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
    ranking: number;
    contributionPoints: number;
    reputation: number;
  }
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  isUnlocked: boolean;
}

export function Achievements({ stats }: AchievementsProps) {
  const calculateAchievements = (): Achievement[] => {
    const achievements: Achievement[] = [
      {
        id: 'beginner',
        title: 'Coding Novice',
        description: 'Solved first 10 problems',
        icon: Code,
        color: 'text-blue-500',
        isUnlocked: stats.totalSolved >= 10
      },
      {
        id: 'problem_solver',
        title: 'Problem Solver',
        description: 'Solved 100+ problems',
        icon: Target,
        color: 'text-green-500',
        isUnlocked: stats.totalSolved >= 100
      },
      {
        id: 'master',
        title: 'LeetCode Master',
        description: 'Solved 500+ problems',
        icon: Trophy,
        color: 'text-yellow-500',
        isUnlocked: stats.totalSolved >= 500
      },
      {
        id: 'easy_expert',
        title: 'Easy Problem Expert',
        description: 'Solved all Easy problems',
        icon: Star,
        color: 'text-green-400',
        isUnlocked: stats.easySolved === stats.totalEasy
      },
      {
        id: 'hard_challenger',
        title: 'Hard Problem Challenger',
        description: 'Solved 50+ Hard problems',
        icon: Flame,
        color: 'text-red-500',
        isUnlocked: stats.hardSolved >= 50
      },
      {
        id: 'accuracy_king',
        title: 'Accuracy King',
        description: '90%+ Acceptance Rate',
        icon: CheckCircle,
        color: 'text-purple-500',
        isUnlocked: stats.acceptanceRate >= 0.9
      },
      {
        id: 'contributor',
        title: 'Community Contributor',
        description: '1000+ Contribution Points',
        icon: Award,
        color: 'text-indigo-600',
        isUnlocked: stats.contributionPoints >= 1000
      },
      {
        id: 'top_ranked',
        title: 'Top Ranked',
        description: 'Ranked in top 10,000',
        icon: Hexagon,
        color: 'text-orange-500',
        isUnlocked: stats.ranking <= 10000
      }
    ];

    return achievements;
  };

  const achievements = calculateAchievements();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-6 w-6" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`
                border rounded-lg p-4 text-center transition-all duration-300
                ${achievement.isUnlocked 
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                  : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 opacity-50'}
              `}
            >
              <div className="flex justify-center mb-2">
                <achievement.icon 
                  className={`
                    h-8 w-8 
                    ${achievement.isUnlocked 
                      ? achievement.color 
                      : 'text-gray-400 dark:text-gray-600'}
                  `} 
                />
              </div>
              <h3 className={`
                text-sm font-semibold mb-1
                ${achievement.isUnlocked 
                  ? 'text-gray-800 dark:text-gray-200' 
                  : 'text-gray-500 dark:text-gray-500'}
              `}>
                {achievement.title}
              </h3>
              <p className={`
                text-xs 
                ${achievement.isUnlocked 
                  ? 'text-gray-600 dark:text-gray-400' 
                  : 'text-gray-400 dark:text-gray-600'}
              `}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}