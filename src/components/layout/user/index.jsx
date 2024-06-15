import Header from './header';
import Footer from './footer';

function DefaultLayoutUser({ children }) {
    return (
        <>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayoutUser;
