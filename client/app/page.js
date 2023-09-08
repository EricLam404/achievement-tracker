import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import Home from "@/components/main/Home";
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Page() {
    const session = await getSession();
    const user = session ? session.user : null;

    return (
        <main>
            {user ? 
                <>
                    <Header />
                    <Home />
                    <Footer />
                </> :
                <a className="btn" href="/api/auth/login">Login</a>
            }
        </main>
    )
}, { returnTo: '' })
