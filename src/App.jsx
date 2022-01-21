import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import Button from "react-bootstrap/Button";
import "./styles/App.css";

var neo4j = require('neo4j-driver')

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [activeQuery, setactiveQuery] = useState(false);

    function ConnectNeo4j() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            //var driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', ''))
            var driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.bearer(response.idToken))
            var session = driver.session({
                database: 'neo4j',
                defaultAccessMode: neo4j.session.WRITE
            })

            session
                .run('CREATE (p:Person {name: $nameSSO}) return p', {
                    nameSSO: accounts[0].name
                })
                .subscribe({
                    onKeys: keys => {
                    console.log(keys)
                    },
                    onNext: record => {
                    console.log(record)
                    },
                    onCompleted: () => {
                    setactiveQuery(true);
                    session.close() 
                    },
                    onError: error => {
                    console.log(error)
                    }
                })

        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <Button variant="secondary" onClick={ConnectNeo4j}>Add me to the graph! 😁</Button>
            {activeQuery && 
                <div>Done! you are now part of the graph!</div>
            }
        </>
    );
};


const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
