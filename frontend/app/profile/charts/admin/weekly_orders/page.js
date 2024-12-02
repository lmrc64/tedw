"use client";
import { useEffect, useState } from "react";
import BarChart from "@/components/charts/BarChart";

export default function Page() {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchWeeklyOrders = async () => {
            try {
                const response = await fetch(process.env.API_ROUTE+"/weeklyOrders");
                if (!response.ok) {
                    throw new Error("Failed to fetch data from API");
                }
                const data = await response.json();

                // Transformar la respuesta para obtener labels y values
                const labelsFromAPI = data.weeklyOrders.map(order => order.week); // Extraer los meses
                const valuesFromAPI = data.weeklyOrders.map(order => order.totalOrders); // Extraer los totales

                // Actualizar los estados
                setLabels(labelsFromAPI);
                setValues(valuesFromAPI);
            } catch (error) {
                console.error("Error fetching weekly orders:", error);
            }
        };

        fetchWeeklyOrders();
    }, []); // El arreglo vacío asegura que este efecto se ejecute una sola vez

    return (
        <div style={{padding: "20px", width: "1920px", height: "800px"}}>
            <BarChart title={"Total of Orders Per Week"} labels={labels} values={values}/>
        </div>
    );
}
