import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
                duration: 4000,
                style: {
                    background: "transparent", // transparent background
                    backdropFilter: "blur(10px)", // frosted glass blur
                    padding: "16px 24px",
                    borderRadius: "16px",
                    fontWeight: "500",
                    fontSize: "12px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)", // subtle shadow
                },
                success: {
                    style: {
                        color: "#06b6d4", // cyan text
                        border: "1px solid #06b6d4", // border same as text
                    },
                    iconTheme: {
                        primary: "#06b6d4", // cyan icon
                        secondary: "transparent",
                    },
                },
                error: {
                    style: {
                        color: "#ef4444", // red text
                        border: "1px solid #ef4444", // border same as text
                    },
                    iconTheme: {
                        primary: "#ef4444", // red icon
                        secondary: "transparent",
                    },
                },
                warning: {
                    style: {
                        color: "#facc15", // yellow text
                        border: "1px solid #facc15", // border same as text
                    },
                    iconTheme: {
                        primary: "#facc15", // yellow icon
                        secondary: "transparent",
                    },
                },
            }}
        />
    );
}
