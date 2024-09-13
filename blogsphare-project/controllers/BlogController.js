import Blog from "@/models/Blog";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from 'next/server'; // Use isso na nova estrutura

// Carregar Blogs
export const getBlogs = async (req) => {
  await connectMongo();
  try {
    const blogs = await Blog.find(); // Certifique-se de buscar os blogs corretamente
    return NextResponse.json({ blogs }, { status: 200 }); // Retorna um objeto JSON com a chave "blogs"
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao carregar blogs' }, { status: 500 });
  }
};

// Carregar Blogs do Usuário
export const getUserBlogs = async (req) => {
  await connectMongo();
  try {
    const blogs = await Blog.find({ UserId: req.user._id });
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao carregar blogs do usuário' }, { status: 500 });
  }
};

// Criar Blog
export const addBlog = async (req) => {
  const { title, description } = await req.json(); // req.body na nova estrutura
  await connectMongo();

  try {
    const newBlog = new Blog({
      title,
      description,
      UserId: req.user._id,
    });
    await newBlog.save();
    return NextResponse.json({ blog: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao adicionar blog' }, { status: 500 });
  }
};

// Atualizar Blog
export const updateBlog = async (req) => {
  const { id } = req.query;
  const { title, description } = await req.json();
  await connectMongo();

  try {
    const updateBlog = await Blog.findOneAndUpdate(
      { _id: id, UserId: req.user._id },
      { title, description },
      { new: true } // Isso retorna o documento atualizado
    );
    if (!updateBlog) {
      return NextResponse.json({ message: 'Blog não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ blog: updateBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar blog' }, { status: 500 });
  }
};

// Deletar Blog
export const deleteBlog = async (req) => {
  const { id } = req.query;
  await connectMongo();

  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id: id, UserId: req.user._id });
    if (!deletedBlog) {
      return NextResponse.json({ message: 'Blog não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog deletado com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao deletar blog' }, { status: 500 });
  }
};

// ----------------------------------------------------------------------------------------------------

// // Adicionar um comentário à publicação
// export const adicionarComentario = async (req, res) => {
//   try {
//     const { id, comentario } = req.body; // Assume que o ID da publicação e o comentário são passados no corpo da requisição
//     const blog = await Blog.findOne({ Id: id });
//     if (!blog) {
//       return res.status(404).json({ message: 'Publicação não encontrada' });
//     }

//     blog.Comentarios = blog.Comentarios ? `${blog.Comentarios}\n${comentario}` : comentario;
//     await blog.save();

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao adicionar comentário', error });
//   }
// };

// // Avaliar a publicação
// export const avaliarPublicacao = async (req, res) => {
//   try {
//     const { id, avaliacao } = req.body; // Assume que o ID da publicação e a avaliação são passados no corpo da requisição


//     const blog = await Blog.findOne({ Id: id });
//     if (!blog) {
//       return res.status(404).json({ message: 'Publicação não encontrada' });
//     }

//     blog.Avaliacao = avaliacao;
//     await blog.save();

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao avaliar publicação', error });
//   }
// };

// // Denunciar a publicação (aqui, apenas marcamos a publicação como denunciada, sem uma implementação real de denúncia)
// export const denunciarPublicacao = async (req, res) => {
//   try {
//     const { id } = req.body; // Assume que o ID da publicação é passado no corpo da requisição
//     const blog = await Blog.findOne({ Id: id });
//     if (!blog) {
//       return res.status(404).json({ message: 'Publicação não encontrada' });
//     }

//     // Aqui, você pode adicionar um campo para marcação de denúncia ou similar
//     // Exemplo: blog.denunciada = true;
//     // blog.save(); // Salvar alterações

//     res.status(200).json({ message: 'Publicação denunciada com sucesso' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao denunciar publicação', error });
//   }
// };

// // Compartilhar a publicação (simplesmente retornando os detalhes da publicação para que o cliente possa compartilhar)
// export const compartilharPublicacao = async (req, res) => {
//   try {
//     const { id } = req.body; // Assume que o ID da publicação é passado no corpo da requisição
//     const blog = await Blog.findOne({ Id: id });
//     if (!blog) {
//       return res.status(404).json({ message: 'Publicação não encontrada' });
//     }

//     // Aqui, você pode implementar a lógica para compartilhar a publicação, por exemplo, enviar um e-mail
//     // Por enquanto, apenas retornamos a publicação para que o cliente possa compartilhar
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao compartilhar publicação', error });
//   }
// };

// // Editar a publicação
// export const editarPublicacao = async (req, res) => {
//   try {
//     const { id, titulo, descricao } = req.body; // Assume que o ID da publicação, novo título e descrição são passados no corpo da requisição
//     const blog = await Blog.findOne({ Id: id });
//     if (!blog) {
//       return res.status(404).json({ message: 'Publicação não encontrada' });
//     }

//     if (titulo) blog.Titulo = titulo;
//     if (descricao) blog.Descricao = descricao;
//     // Atualizar outros campos conforme necessário

//     await blog.save();

//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao editar publicação', error });
//   }
// };
