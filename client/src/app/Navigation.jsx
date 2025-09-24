import React from 'react';

import { Route, Routes } from 'react-router-dom';

import ProjectList from '../project_list/ProjectList';
import Project from '../project/Project';
import Properties from '../properties/Properties';
import Contact from '../Contact';
import NotFound from '../NotFound';
import Privacy from '../Privacy';
import NewProject from '../project_list/NewProject';
import Mnemonic from '../Mnemonic';

function Navigation() {
    return (
        <div className="app-body">
            <Routes>
                <Route
                    path="/project/new"
                    element={<NewProject />}
                />
                <Route
                    path="/project/:id"
                    element={<Project />}
                />
                <Route
                    path="/properties"
                    element={<Properties />}
                />
                <Route
                    path="/contact/"
                    element={<Contact />}
                />
                <Route
                    path="/mnemonic/"
                    element={<Mnemonic />}
                />
                <Route
                    path="/privacy/"
                    element={<Privacy />}
                />
                <Route
                    path="/"
                    element={<ProjectList />}
                />
                <Route
                    element={<NotFound />}
                />

            </Routes>
        </div>
    );
}
export default Navigation;
