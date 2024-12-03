'user server'

import { signIn } from "@/auth";

export async function GET(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    console.log('redirect code ', code)
    await signIn('oauth-woori', {code});

    return Response.redirect(`${process.env.NEXT_PUBLIC_FRONT_PAGE_URL}`, 302);
}
