import type { GitHubRepo } from '../types/github';

interface Props {
  repo: GitHubRepo;
  onClick: (repo: GitHubRepo) => void;
}

export function RepoCard({ repo, onClick }: Props) {
  return (
    <button className="card" onClick={() => onClick(repo)}>
      <h3>{repo.name}</h3>
      <p>{repo.description ?? 'Sem descrição.'}</p>
    </button>
  );
}
