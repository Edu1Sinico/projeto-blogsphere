import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const jwtMiddleware = (handler) => async (req) => {
  const token = req.headers.get('authorization')?.split(' ')[1]; // Obtém o token do header

  if (!token) {
    return NextResponse.json({ message: 'Token ausente ou inválido' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.user = decoded; // Armazena os dados do usuário no request
    return handler(req); // Continua para o próximo handler
  } catch (error) {
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
  }
};
