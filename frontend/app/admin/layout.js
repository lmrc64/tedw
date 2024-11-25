//pages/_app.js

import "@/styles/globals.css";

export default function AdminLayout({ children }) {
    return (
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}