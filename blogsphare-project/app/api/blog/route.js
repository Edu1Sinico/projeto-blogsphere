import { jwtMiddleware } from "@/utils/middleware";
import { getBlogs, getUserBlogs, addBlog, updateBlog, deleteBlog } from "@/controllers/BlogController";
import { NextResponse } from "next/server";

// método GET - listar todos os Blogs
export async function GET(req) {
    return jwtMiddleware(async (req) => {
        const blogs = await getBlogs(req);
        return NextResponse.json(blogs, { status: 200 }); // Envia a resposta usando NextResponse
    })(req);
}

// Método POST - Adicionar novo blog
export async function POST(req) {
    return jwtMiddleware(async (req) => {
        const blog = await addBlog(req);
        return NextResponse.json(blog, { status: 201 }); // Resposta de criação bem-sucedida
    })(req);
}

// Método PUT - Atualiza um blog existente
export async function PUT(req) {
    return jwtMiddleware(async (req) => {
        const updatedBlog = await updateBlog(req);
        return NextResponse.json(updatedBlog, { status: 200 }); // Resposta de atualização bem-sucedida
    })(req);
}

// Método DELETE - Deleta um blog existente
export async function DELETE(req) {
    return jwtMiddleware(async (req) => {
        const deletedBlog = await deleteBlog(req);
        return NextResponse.json(deletedBlog, { status: 200 }); // Resposta de deleção bem-sucedida
    })(req);
}
