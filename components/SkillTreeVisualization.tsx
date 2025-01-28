"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  name: string;
  subcategories: SkillSubcategory[];
}

interface SkillSubcategory {
  name: string;
  solved: number;
  total: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface SkillTreeVisualizationProps {
  stats: {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
  }
}

export function SkillTreeVisualization({ stats }: SkillTreeVisualizationProps) {
  const skillCategories: SkillCategory[] = [
    {
      name: 'Data Structures',
      subcategories: [
        { 
          name: 'Arrays', 
          solved: stats.easySolved, 
          total: stats.totalEasy, 
          difficulty: 'Easy' 
        },
        { 
          name: 'Linked Lists', 
          solved: stats.mediumSolved, 
          total: stats.totalMedium, 
          difficulty: 'Medium' 
        },
        { 
          name: 'Trees', 
          solved: stats.hardSolved, 
          total: stats.totalHard, 
          difficulty: 'Hard' 
        }
      ]
    },
    {
      name: 'Algorithms',
      subcategories: [
        { 
          name: 'Sorting', 
          solved: Math.floor(stats.easySolved / 2), 
          total: Math.floor(stats.totalEasy / 2), 
          difficulty: 'Easy' 
        },
        { 
          name: 'Searching', 
          solved: Math.floor(stats.mediumSolved / 2), 
          total: Math.floor(stats.totalMedium / 2), 
          difficulty: 'Medium' 
        },
        { 
          name: 'Dynamic Programming', 
          solved: Math.floor(stats.hardSolved / 2), 
          total: Math.floor(stats.totalHard / 2), 
          difficulty: 'Hard' 
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Tree Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.subcategories.map((skill, skillIndex) => (
                <div 
                  key={skillIndex} 
                  className="border rounded-lg p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span 
                      className={`
                        text-xs font-bold px-2 py-1 rounded 
                        ${getDifficultyColor(skill.difficulty)}
                        text-white
                      `}
                    >
                      {skill.difficulty}
                    </span>
                  </div>
                  <Progress 
                    value={skill.total > 0 ? (skill.solved / skill.total) * 100 : 0} 
                    className="h-2 mt-2" 
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    {skill.solved} / {skill.total} solved
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}