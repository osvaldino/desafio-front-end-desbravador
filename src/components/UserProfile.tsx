
interface UserProfileProps {
  user: {
    avatar_url: string;
    name: string;
    login: string;
    email: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="rounded-2xl p-6 mb-8 fade-in">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-white/50"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.login}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-700">{user.bio}</p>
          <div className="flex gap-6 mt-4">
            <div>
              <span className="font-bold">{user.followers}</span>
              <p className="text-sm text-gray-600">Seguidores</p>
            </div>
            <div>
              <span className="font-bold">{user.following}</span>
              <p className="text-sm text-gray-600">Seguindo</p>
            </div>
            <div>
              <span className="font-bold">{user.public_repos}</span>
              <p className="text-sm text-gray-600">Repositórios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}