import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

// Aumentar el límite de tamaño para el cuerpo de la petición (App Router)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
        nombre, escuela, grado, cargo, tutor, telefono, 
        ine, constancia, regiduria_id, regiduria_name 
    } = data;

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_USERNAME;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
        return NextResponse.json({ success: false, error: 'Configuración de servidor incompleta.' }, { status: 500 });
    }

    const octokit = new Octokit({ auth: token });

    // 1. Generate Folio
    const folio = `CP-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // 2. Upload Images to GitHub data/uploads/
    const uploadImage = async (base64: string, filename: string) => {
        if (!base64 || !base64.includes(',')) return null;
        const content = base64.split(',')[1];
        const path = `data/uploads/${folio}-${filename}`;
        
        await octokit.rest.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message: `Upload ${filename} for ${folio}`,
            content: content
        });
        
        return path;
    };

    const inePath = await uploadImage(ine, 'ine.jpg');
    const constanciaPath = await uploadImage(constancia, 'constancia.jpg');

    // 3. Update JSON
    const jsonPath = 'data/inscritos.json';
    let currentInscritos = [];
    let sha = '';

    try {
      const { data: fileData } = (await octokit.rest.repos.getContent({
        owner,
        repo,
        path: jsonPath,
      })) as any;

      if (fileData && !Array.isArray(fileData)) {
          const content = Buffer.from(fileData.content, 'base64').toString();
          currentInscritos = JSON.parse(content);
          sha = fileData.sha;
      }
    } catch (error: any) {
      if (error.status !== 404) {
          console.error('Error fetching JSON:', error);
          throw error;
      }
    }

    const newEntry = {
      folio,
      nombre,
      escuela,
      grado,
      cargo,
      regiduria_id,
      regiduria_name,
      tutor,
      telefono,
      ine_url: inePath,
      constancia_url: constanciaPath,
      fecha: new Date().toISOString()
    };

    const updatedInscritos = [...currentInscritos, newEntry];

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: jsonPath,
      message: `Nuevo registro: ${folio}`,
      content: Buffer.from(JSON.stringify(updatedInscritos, null, 2)).toString('base64'),
      sha: sha || undefined
    });

    return NextResponse.json({ success: true, folio });
  } catch (error: any) {
    console.error('Error en registro completo:', error);
    return NextResponse.json({ success: false, error: 'Error interno o fotos muy pesadas.' }, { status: 500 });
  }
}
