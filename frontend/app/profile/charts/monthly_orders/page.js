"use client";
import { useEffect, useState } from "react";
import BarChart from "@/components/charts/BarChart";

export default function Page() {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchMonthlyOrders = async () => {
            try {
                //change for sessionStorage 673e7bdef73b581262939636
                const response = await fetch(process.env.API_ROUTE+"/monthlyOrders/"+sessionStorage.getItem('id'));
                if (!response.ok) {
                    throw new Error("Failed to fetch data from API");
                }
                const data = await response.json();

                // Transformar la respuesta para obtener labels y values
                const labelsFromAPI = data.monthlyOrders.map(order => order.month); // Extraer los meses
                const valuesFromAPI = data.monthlyOrders.map(order => order.totalOrders); // Extraer los totales

                // Actualizar los estados
                setLabels(labelsFromAPI);
                setValues(valuesFromAPI);
            } catch (error) {
                console.error("Error fetching monthly orders:", error);
            }
        };

        fetchMonthlyOrders();
    }, []); // El arreglo vacío asegura que este efecto se ejecute una sola vez

    return (
        <div style={{padding: "20px", width: "1920px", height: "800px"}}>
            <BarChart title={"Orders Per Month"} labels={labels} values={values}/>
        </div>
    );
}
