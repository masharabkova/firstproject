"use client";

interface PointsProps {
    points: number;
}

export function Points({ points }: PointsProps) {
    return (
        <div className="text-center my-4">
            <h2 className="text-2xl font-bold text-pink-800">Points: {points}</h2>
        </div>
    );
}