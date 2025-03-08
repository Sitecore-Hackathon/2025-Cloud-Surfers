import type { NextApiRequest, NextApiResponse } from 'next';

const bypass = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'text/javascript');
  try {
    // Resolve site based on hostname
    const url = req.query['url']?.toString() || '';
    console.log('PROXY URL', url);
    // TODO: validate url to avoid vulnerabilites
    const response = !url ? '' : await fetch(url);
    const text = !response ? '' : await response.text();
    console.log('PROXY RESPONSE', text);
    return res.status(200).send(text);
  } catch (ex) {
    console.error('UH OH', ex);
  }
};

export default bypass;
