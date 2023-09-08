import Home from "@/components/main/Home";
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Page() {
    const session = await getSession();
    const user = session ? session.user : null;

    return (
        <main>
            {user ? 
                <>
                    <Home />
                </> :
                <a className="btn" href="/api/auth/login">Login</a>
            }
        </main>
    )
}, { returnTo: '' })
