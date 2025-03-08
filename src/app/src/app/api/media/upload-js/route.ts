import { NextResponse } from 'next/server';
import uploadMediaInSitecore from 'src/lib/sitecore-media/uploadMediaInSitecore';

export const dynamic = 'force-dynamic'; // defaults to auto
export const revalidate = 0;

interface bodyIncoming {
  name: string;
  content: string;
  fileName: string;
}

/* POST JS to Media Library */
export async function POST(request: Request) {
  const body: bodyIncoming = await request.json();

  const mediaProps = {
    content: body.content,
    mediapath: body.name,
    fileName: body.fileName,
    publishItem: true,
  };

  // TODO: Add request filter for better vulnerability protection
  const uploadMediaInSitecoreResponse = await uploadMediaInSitecore(mediaProps);

  return NextResponse.json<string>(JSON.stringify(uploadMediaInSitecoreResponse));
}
