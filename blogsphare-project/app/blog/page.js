'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/blog', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setBlogs(data.blogs);
            } else {
                router.push('/login'); // Redireciona para login se houver erro
            }
        };

        fetchBlogs();
    }, [router]);

    const addBlog = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        });

        const data = await response.json();
        if (data.blog) {
            // Supondo que "data.blog" retorne o novo blog cadastrado
            setBlogs([...blogs, data.blog]); // Adiciona o novo blog ao array de blogs
        } else{
            console.error("Não foi possível cadastrar ao banco.");
        }
        setNewTitle('');
        setNewDescription('');
    };

    const deleteBlog = async (id) => {
        const token = localStorage.getItem('token');
        await fetch(`/api/blog?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove o blog deletado da lista
    };

    return (
        <div>
            <h1>Adicionar publicação</h1>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título"
            />
            <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Descrição"
            />
            <button onClick={addBlog}>Publicar</button>
            {/* <ul>
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <li key={blog._id}>
                            {blog.title}
                            {blog.description}
                            <button onClick={() => deleteBlog(blog._id)}>Excluir</button>
                        </li>
                    ))
                ) : (
                    <li>Nenhum blog encontrado</li>
                )}
            </ul> */}
        </div>
    );
}
