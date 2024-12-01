"use client";
import { useEffect, useState } from "react";
import BarChart from "@/components/charts/BarChart";

export default function Page() {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                // Hacer las peticiones a los tres endpoints
                const [ordersResponse, usersResponse, productsResponse] = await Promise.all([
                    fetch("http://localhost:3008/api/v1/currentYearOrders"),
                    fetch("http://localhost:3008/api/v1/chart/currentYearUsers"),
                    fetch("http://localhost:3008/api/v1/currentYearProducts"),
                ]);

                // Verificar si todas las respuestas son exitosas
                if (!ordersResponse.ok || !usersResponse.ok || !productsResponse.ok) {
                    throw new Error("Failed to fetch data from one or more APIs");
                }

                // Obtener los datos de cada API
                const ordersData = await ordersResponse.json();
                const usersData = await usersResponse.json();
                const productsData = await productsResponse.json();

                // Crear los labels y values a partir de las respuestas
                const labelsFromAPI = [
                    "Total Number of Orders",   // Label para las órdenes
                    "Total Number of Users",    // Label para los usuarios
                    "Total Number of Products", // Label para los productos
                ];

                const valuesFromAPI = [
                    ordersData.totalOrders,  // Total de órdenes
                    usersData.totalUsers,    // Total de usuarios
                    productsData.totalProducts, // Total de productos
                ];

                // Actualizar los estados con los datos
                setLabels(labelsFromAPI);
                setValues(valuesFromAPI);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };

        fetchStatistics();
    }, []); // El arreglo vacío asegura que este efecto se ejecute una sola vez

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gráficos con Chart.js</h1>
            <BarChart title={"General Statistics For Current Year"} labels={labels} values={values} />
        </div>
    );
}
