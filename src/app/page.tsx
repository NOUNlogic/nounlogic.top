import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">
        National Open University of Nigeria - Student Hub
      </h1>
      <p className="text-lg text-gray-600">
        Welcome to the student community platform. Connect, collaborate, and
        access resources.
      </p>
    </div>
  );
}
