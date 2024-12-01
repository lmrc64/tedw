"use client";
import { useEffect, useState } from "react";
import BarChart from "@/components/charts/BarChart";

export default function Page() {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchYearlyOrders = async () => {
            try {
                const response = await fetch("http://localhost:3008/api/v1/yearlyOrders");
                if (!response.ok) {
                    throw new Error("Failed to fetch data from API");
                }
                const data = await response.json();

                // Transformar la respuesta para obtener labels y values
                const labelsFromAPI = data.yearlyOrders.map(order => order.year); // Extraer los meses
                const valuesFromAPI = data.yearlyOrders.map(order => order.totalOrders); // Extraer los totales

                // Actualizar los estados
                setLabels(labelsFromAPI);
                setValues(valuesFromAPI);
            } catch (error) {
                console.error("Error fetching weekly orders:", error);
            }
        };

        fetchYearlyOrders();
    }, []); // El arreglo vacío asegura que este efecto se ejecute una sola vez

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gráficos con Chart.js</h1>
            <BarChart title={"Total of Orders Per Year"} labels={labels} values={values} />
        </div>
    );
}
