import { ArrowUpDown, GitFork, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories: initialRepositories }: RepositoryListProps) {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    const sorted = [...repositories].sort((a, b) => {
      return newOrder === "desc"
        ? b.stargazers_count - a.stargazers_count
        : a.stargazers_count - b.stargazers_count;
    });
    setRepositories(sorted);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Repositórios</h2>
        <button
          onClick={toggleSort}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowUpDown className="h-4 w-4" />
          Ordenar por estrelas ({sortOrder === "desc" ? "Decrescente" : "Crescente"})
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repositories.map((repo) => (
          <Link
            key={repo.id}
            to={`/repository/${repo.full_name}`}
            className="p-6 rounded-xl card-hover"
          >
            <h3 className="text-lg font-semibold">{repo.name}</h3>
            <p className="text-gray-600 mt-2 line-clamp-2">{repo.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4 text-gray-500" />
                <span>{repo.forks_count}</span>
              </div>
              {repo.language && (
                <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                  {repo.language}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}