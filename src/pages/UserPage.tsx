import { RepositoryList } from "@/components/RepositoryList";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/components/UserProfile";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&direction=desc`),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("Usuário não encontrado");
        }

        const userData = await userResponse.json();
        
        const reposData = await reposResponse.json();

        setUser(userData);
        setRepositories(reposData);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao buscar usuário. Por favor tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl p-6 mb-8 animate-pulse">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user)
    navigate('/');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
        <Link
          to={'/'}
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        </div>
        <UserProfile user={user} />
        <RepositoryList repositories={repositories} />
      </div>
    </div>
  );
}