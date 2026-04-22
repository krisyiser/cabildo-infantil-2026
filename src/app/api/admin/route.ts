import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { folio, ...updates } = data;

    if (!folio) {
      return NextResponse.json({ success: false, error: 'Folio es requerido.' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_USERNAME;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json({ success: false, error: 'Configuración de servidor incompleta.' }, { status: 500 });
    }

    const octokit = new Octokit({ auth: token });
    const jsonPath = 'data/inscritos.json';

    const { data: fileData } = (await octokit.rest.repos.getContent({
      owner: owner as string,
      repo: repo as string,
      path: jsonPath,
    })) as any;

    const content = Buffer.from(fileData.content, 'base64').toString();
    const currentInscritos = JSON.parse(content);
    const sha = fileData.sha;

    const index = currentInscritos.findIndex((item: any) => item.folio === folio);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Registro no encontrado.' }, { status: 404 });
    }

    // Update the entry
    currentInscritos[index] = { ...currentInscritos[index], ...updates };

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: owner as string,
      repo: repo as string,
      path: jsonPath,
      message: `Actualización de registro: ${folio}`,
      content: Buffer.from(JSON.stringify(currentInscritos, null, 2)).toString('base64'),
      sha: sha
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error en admin update:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folio = searchParams.get('folio');

    if (!folio) {
      return NextResponse.json({ success: false, error: 'Folio es requerido.' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_USERNAME;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json({ success: false, error: 'Configuración de servidor incompleta.' }, { status: 500 });
    }

    const octokit = new Octokit({ auth: token });
    const jsonPath = 'data/inscritos.json';

    const { data: fileData } = (await octokit.rest.repos.getContent({
      owner: owner as string,
      repo: repo as string,
      path: jsonPath,
    })) as any;

    const content = Buffer.from(fileData.content, 'base64').toString();
    const currentInscritos = JSON.parse(content);
    const sha = fileData.sha;

    const updatedInscritos = currentInscritos.filter((item: any) => item.folio !== folio);

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: owner as string,
      repo: repo as string,
      path: jsonPath,
      message: `Eliminación de registro: ${folio}`,
      content: Buffer.from(JSON.stringify(updatedInscritos, null, 2)).toString('base64'),
      sha: sha
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error en admin delete:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
