"use client";

import Link from "next/link";

export default function Page() {
    const routes = [
        { href: "/profile/charts/admin/weekly_orders", label: "Weekly Orders", icon: "📊" },
        { href: "/profile/charts/admin/monthly_orders", label: "Monthly Orders", icon: "🗠" },
        { href: "/profile/charts/admin/yearly_orders", label: "Yearly Orders", icon: "📈" },
        { href: "/profile/charts/admin/statistics", label: "General Statistics", icon: "💹" }
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row", // Cambiado a 'row' para disposición horizontal
                justifyContent: "center",
                alignItems: "center",
                gap: "50px", // Espaciado horizontal entre botones
                height: "70vh", // Ocupa toda la altura de la ventana
                backgroundColor: "#f5f5f5" // Fondo para mejor visibilidad
            }}
        >
            {routes.map((route, index) => (
                <Link
                    key={index}
                    href={route.href}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "#333",
                        padding: "20px",
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        width: "250px",
                        height: "250px",
                        textAlign: "center",
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <span style={{ fontSize: "80px" }}>{route.icon}</span>
                    <span style={{ fontSize: "40px", fontWeight: "bold" }}>{route.label}</span>
                </Link>
            ))}
        </div>
    );
}
