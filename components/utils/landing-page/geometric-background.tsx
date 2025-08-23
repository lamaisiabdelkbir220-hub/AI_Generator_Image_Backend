"use client";

import { useEffect, useState } from "react";

interface GeometricShape {
    id: number;
    type: "circle" | "square" | "blob";
    size: number;
    x: number;
    y: number;
    opacity: number;
    rotation: number;
    animationDuration: number;
}

export function GeometricBackground() {
    const [shapes, setShapes] = useState<GeometricShape[]>([]);

    useEffect(() => {
        // Create random shapes
        const newShapes: GeometricShape[] = [];
        const shapeTypes: ("circle" | "square" | "blob")[] = ["circle", "square", "blob"];

        for (let i = 0; i < 6; i++) {
            newShapes.push({
                id: i,
                type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
                size: Math.random() * 300 + 100,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.2 + 0.1,
                rotation: Math.random() * 360,
                animationDuration: Math.random() * 30 + 20,
            });
        }

        setShapes(newShapes);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="mesh-grid"></div>

            {shapes.map((shape) => (
                <div
                    key={shape.id}
                    className={`geometric-shape geometric-${shape.type}`}
                    style={{
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        opacity: shape.opacity,
                        transform: `rotate(${shape.rotation}deg)`,
                        animation: `float ${shape.animationDuration}s ease-in-out infinite, 
                       rotate-slow ${shape.animationDuration * 2}s linear infinite${
                            shape.type === "blob" ? ", morph 8s ease-in-out infinite" : ""
                        }`,
                    }}
                />
            ))}

            <div
                className="glowing-orb"
                style={{
                    width: "600px",
                    height: "600px",
                    left: "70%",
                    top: "30%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <div
                className="glowing-orb"
                style={{
                    width: "400px",
                    height: "400px",
                    left: "20%",
                    top: "70%",
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.8), rgba(167, 139, 250, 0.1) 70%)",
                }}
            />
        </div>
    );
}
