import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchUserData } from '../services/github';
import type { GitHubRepo, GitHubUser } from '../types/github';
import { Loading } from '../components/Loading';
import { RepoCard } from '../components/RepoCard';
import { RepoModal } from '../components/RepoModal';

interface Data { user: GitHubUser; repos: GitHubRepo[] }

export function UserPage() {
  const { username = '' } = useParams();
  const location = useLocation();
  const initial = location.state as Data | null;
  const [data, setData] = useState<Data | null>(initial);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<GitHubRepo | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (data && data.user.login.toLowerCase() === username.toLowerCase()) return;
    setData(null);
    setError('');
    fetchUserData(username).then(setData).catch((e: Error) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <main className="user-page">
      <Link to="/" className="back">← Voltar</Link>
      {error && <p className="error">{error}</p>}
      {!data && !error && <Loading />}
      {data && (
        <>
          <section className="profile">
            <img src={data.user.avatar_url} alt={`Avatar de ${data.user.login}`} />
            <div>
              <h1>{data.user.name ?? data.user.login}</h1>
              <p className="login">@{data.user.login}</p>
              <p>{data.user.bio ?? 'Sem bio.'}</p>
            </div>
          </section>
          <h2>Repositórios ({data.repos.length})</h2>
          {data.repos.length === 0 ? (
            <p>Este usuário não possui repositórios públicos.</p>
          ) : (
            <div className="grid">
              {data.repos.map((r) => <RepoCard key={r.id} repo={r} onClick={setSelected} />)}
            </div>
          )}
        </>
      )}
      {selected && <RepoModal repo={selected} onClose={closeModal} />}
    </main>
  );
}
