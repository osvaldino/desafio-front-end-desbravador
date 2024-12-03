import { SearchBar } from "@/components/SearchBar";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl font-bold mb-4">GitHub Explorer</h1>
        <p className="text-gray-600">Pesquise usuários do GitHub e explore seus repositórios</p>
      </div>
      <SearchBar />
    </div>
  );
}