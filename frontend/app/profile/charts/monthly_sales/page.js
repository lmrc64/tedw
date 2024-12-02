"use client";
import { useEffect, useState } from "react";
import BarChart from "@/components/charts/BarChart";

export default function Page() {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchMonthlySales = async () => {
            try {
                //change for sessionStorage 674bbb0c3b1611e6be82ba43
                const response = await fetch(process.env.API_ROUTE+"/monthlySales/"+sessionStorage.getItem('id'));
                if (!response.ok) {
                    throw new Error("Failed to fetch data from API");
                }
                const data = await response.json();

                // Transformar la respuesta para obtener labels y values
                const labelsFromAPI = data.monthlySales.map(order => order.month); // Extraer los meses
                const valuesFromAPI = data.monthlySales.map(order => order.totalSales); // Extraer los totales

                // Actualizar los estados
                setLabels(labelsFromAPI);
                setValues(valuesFromAPI);
            } catch (error) {
                console.error("Error fetching monthly sales:", error);
            }
        };

        fetchMonthlySales();
    }, []); // El arreglo vacío asegura que este efecto se ejecute una sola vez

    return (
        <div style={{padding: "20px", width: "1920px", height: "800px"}}>
            <BarChart title={"Sales Per Month"} labels={labels} values={values}/>
        </div>
    );
}
