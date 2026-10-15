import { useEffect } from 'react';
import type { GitHubRepo } from '../types/github';

interface Props {
  repo: GitHubRepo;
  onClose: () => void;
}

export function RepoModal({ repo, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const visibility = repo.visibility ?? (repo.private ? 'private' : 'public');

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Fechar">×</button>
        <h2>{repo.name}</h2>
        <p><strong>Visibilidade:</strong> {visibility === 'public' ? 'Público' : 'Privado'}</p>
        <p><strong>Linguagem:</strong> {repo.language ?? 'Não informada'}</p>
        <p><strong>Descrição:</strong> {repo.description ?? 'Sem descrição.'}</p>
        <p><strong>Link:</strong> <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></p>
      </div>
    </div>
  );
}
