import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ExternalLink, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RepositoryPage() {
  const { owner, name } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
        
        if (!response.ok) {
          throw new Error("Repositório não encontrado!");
        }

        const data = await response.json();
        setRepository(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao buscar repositório. Por favor tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (owner && name) {
      fetchRepository();
    }
  }, [owner, name]);

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!repository) return null;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to={`/user/${owner}`}
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <div className="rounded-2xl p-8 fade-in">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{repository.name}</h1>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ver no GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-600 text-lg mb-6">{repository.description}</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{repository.stargazers_count}</span>
              <span className="text-gray-600">estrelas</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">{repository.forks_count}</span>
              <span className="text-gray-600">forks</span>
            </div>
            {repository.language && (
              <div className="px-3 py-1 bg-gray-100 rounded-full">
                {repository.language}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}