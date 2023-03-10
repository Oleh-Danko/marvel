import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import { SliderWithFirstFetch, SliderWithSecondFetch, HelloWithLogger } from "../myTest/HOC";

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPages = lazy(() => import('../pages/ComicsPages'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))

const App = () => {
    const onScroll = () => {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            let clientHeight = window.pageYOffset + document.documentElement.clientHeight
            if ((clientHeight >= scrollHeight)) console.log(123)
            // if ((clientHeight >= scrollHeight)) this.onRequest(this.stateoffset)  
        });
    }

    return (
        // <>
        //     <HelloWithLogger/>
        //     <SliderWithFirstFetch/>
        //     <SliderWithSecondFetch/>
        // </>
        <Router>
            <div className="app"
            // onScroll={this.onScroll}
            >
                <AppHeader/>
                <main>
                   <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>} />
                            <Route path='/comics' element={<ComicsPages/>} />
                            <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                   </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;
