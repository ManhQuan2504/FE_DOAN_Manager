// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from './redux/slide/couterSlide';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '~/routes';
import DefaultLayoutUser from './components/layout/user';
import { Fragment } from 'react';
function App() {
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();
  return (
    <Router>
      <div>
        <Routes>
          {AppRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayoutUser;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
