import uploadMediaToSitecore, { UploadMediaToSitecoreProps } from 'lib/sitecore-media/uploadMediaToSitecore';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export const revalidate = 0;
/* THIS ROUTE IS NOT USED FOR OUR HACKATHON SOLUTION
Just a bonus (but would need to be better protected)
*/
interface bodyIncoming {
  name: string;
  content: string;
  fileName: string;
}

/* POST JS to Media Library */
export async function POST(request: Request) {
  const body: bodyIncoming = await request.json();

  const mediaProps: UploadMediaToSitecoreProps = {
    content: body.content,
    mediapath: body.name,
    fileName: body.fileName,
    publishItem: true,
  };

  // TODO: Add request filter for better vulnerability protection
  const uploadMediaInSitecoreResponse = await uploadMediaToSitecore(mediaProps);

  return NextResponse.json<string>(JSON.stringify(uploadMediaInSitecoreResponse));
}
