import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Auth from "./components/auth/Auth";
import HomePage from "./components/blog_list/HomePage";
import BlogList from "./components/blog_list/BlogList";
import BlogEditPage from "./components/editBlog/BlogEditPage";
import BlogDetail from "./components/blog_detail/BlogDetail";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/register" component={Auth} />
                <Route exact path="/login" component={Auth} />
                <Route exact path={["/", "/home"]} component={HomePage} />
                <Route exact path="/blog/list" component={BlogList} />
                <Route exact path="/blog/create" component={BlogEditPage} />
                <Route path="blog/edit/:id" component={BlogEditPage} />
                <Route path="/blog/:id" component={BlogDetail} />
                <Route path="/profile/:id" component={Profile} />
                <Route exact path="/profile/edit" component={EditProfile} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
