import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Auth from "./components/auth/Auth";
import HomePage from "./components/blog_list/HomePage";
import BlogEditPage from "./components/blog_edit/BlogEditPage";
import BlogDetailPage from "./components/blog_detail/BlogDetailPage";
import Profile from "./components/profile/profile_info/Profile";
import EditProfile from "./components/profile/edit_profile/EditProfile";
import AuthContextProvider from "./contexts/AuthContext";
import BlogsPage from "./components/blog_list/BlogsPage";

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route
                        exact
                        path="/register"
                        render={(routeProps) => (
                            <Auth authState="signup" {...routeProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={(routeProps) => (
                            <Auth authState="signin" {...routeProps} />
                        )}
                    />
                    <Route exact path={["/", "/home"]} component={HomePage} />
                    <Route exact path="/blogs" component={BlogsPage} />
                    <Route exact path="/create" component={BlogEditPage} />
                    <Route path="/edit/:id" component={BlogEditPage} />
                    <Route path="/blog/:id" component={BlogDetailPage} />
                    <Route exact path="/profile/edit" component={EditProfile} />
                    <Route path="/profile/:id" component={Profile} />
                </Switch>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
