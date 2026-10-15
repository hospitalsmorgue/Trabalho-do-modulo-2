import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../services/github';
import { Loading } from '../components/Loading';

export function Home() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = username.trim();
    if (!name) {
      setError('Digite um nome de usuário para pesquisar.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await fetchUserData(name);
      navigate(`/user/${name}`, { state: data });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home">
      <h1>Buscador de Usuários do GitHub</h1>
      <form onSubmit={handleSubmit} className="search">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o nome de usuário"
          aria-label="Nome de usuário do GitHub"
        />
        <button type="submit" disabled={loading}>Pesquisar</button>
      </form>
      {loading && <Loading />}
      {error && <p className="error">{error}</p>}
    </main>
  );
}
