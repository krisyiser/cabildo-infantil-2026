import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, escuela, grado, cargo, tutor, telefono } = data;

    const owner = process.env.GITHUB_USERNAME!;
    const repo = process.env.GITHUB_REPO!;
    const path = 'data/inscritos.json';

    // 1. Get current file
    let currentInscritos = [];
    let sha = '';

    try {
      const { data: fileData } = (await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      })) as any;

      const content = Buffer.from(fileData.content, 'base64').toString();
      currentInscritos = JSON.parse(content);
      sha = fileData.sha;
    } catch (error: any) {
      if (error.status !== 404) throw error;
      // If 404, file doesn't exist yet, which is fine
    }

    // 2. Add new entry with Folio
    const folioNumber = (currentInscritos.length + 1).toString().padStart(3, '0');
    const folio = `CP-2026-${folioNumber}`;
    
    const newEntry = {
      folio,
      nombre,
      escuela,
      grado,
      cargo,
      tutor,
      telefono,
      fecha: new Date().toISOString()
    };

    const updatedInscritos = [...currentInscritos, newEntry];

    // 3. Push to GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Nuevo registro: ${folio} - ${nombre}`,
      content: Buffer.from(JSON.stringify(updatedInscritos, null, 2)).toString('base64'),
      sha: sha || undefined
    });

    return NextResponse.json({ success: true, folio });
  } catch (error: any) {
    console.error('Error en registro:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
