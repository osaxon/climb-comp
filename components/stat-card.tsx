import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
    title: string;
};

export default function StatCard({ title = "Stat card" }: StatCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Content</p>
            </CardContent>
        </Card>
    );
}
