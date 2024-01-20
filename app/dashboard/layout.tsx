type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen border flex items-center justify-center">
            {children}
        </div>
    );
}
