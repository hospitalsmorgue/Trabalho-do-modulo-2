import type { GitHubRepo, GitHubUser } from '../types/github';

const API = 'https://api.github.com';

async function get<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new Error('Erro de rede. Verifique sua conexão e tente novamente.');
  }
  if (res.status === 404) throw new Error('Usuário não encontrado.');
  if (res.status === 403) throw new Error('Limite de requisições da API do GitHub atingido. Tente mais tarde.');
  if (!res.ok) throw new Error(`Erro ao buscar dados (status ${res.status}).`);
  return res.json() as Promise<T>;
}

export async function fetchUserData(username: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
  const u = encodeURIComponent(username);
  const [user, repos] = await Promise.all([
    get<GitHubUser>(`${API}/users/${u}`),
    get<GitHubRepo[]>(`${API}/users/${u}/repos?per_page=100`),
  ]);
  return { user, repos };
}
