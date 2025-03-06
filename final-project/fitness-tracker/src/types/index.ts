// src/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    weight?: number;
    height?: number;
}

export interface Exercise {
    id: number;
    name: string;
    duration: number; // in minutes
    caloriesBurned: number;
}

export interface WorkoutLog {
    id: number;
    date: string; // ISO format date
    exercises: Exercise[];
    totalCaloriesBurned: number;
}

export interface Progress {
    date: string; // ISO format date
    weight: number;
    bodyFatPercentage?: number;
}