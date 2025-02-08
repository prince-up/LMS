import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
}

export default function CourseCard({ id, title, description }: CourseCardProps) {
  const router = useRouter();

  return (
    <Card
      className="relative bg-[#0a0a0a] border border-gray-800 text-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={() => router.push(`http://localhost:3000/home/view/${id}`)} // ✅ Redirect to course details page
    >
      <CardContent className="p-4">
      <div className="h-36 bg-blue-600 flex items-center justify-center rounded-xl hover:bg-blue-500">
        <span className="bg-gray-900 text-lg px-3 py-1 rounded-xl hover:bg-gray-800">{title}</span>
      </div>
        
        <p className="text-gray-400 text-xl">{description}</p>
      </CardContent>
    </Card>
  );
}
