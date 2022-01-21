   # README

   ## Installation & run
   ```
   git clone https://github.com/msenechal/neo4j-sso-reactjs.git
   cd neo4j-sso-reactjs
   npm i
   npm start
   ```

   ## Documentation
   URI to Neo4j DB:
   In App.jsx, line 20
   ```var driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.bearer(response.idToken)) ```

   authConfig.js:
    clientId => Azure client application ID
    
   authority => URL to the tenant 
   
   redirectUri => redirect URL 

   **Note** 
