# nodered-builder

This image can be used as a base for building REST-ful APIs using node-red.

The api is built on top of node-red. The api is exposed at `/api`, the admin ui is at `/admin` and the dashboard is at `/dashboard`.

You can secure the editor, dashboard, and/or api by edting the settings.js file and implementing the authorization token as described at [Securing Node-Red](https://nodered.org/docs/user-guide/runtime/securing-node-red#accessing-the-admin-api).

### Developing the API

- Run the container:
`docker run --rm -p 1880:1880  -v $(pwd)/data:/data nodered-builder`
- Connect to the node-red UI: `http://localhost:1880/admin`
- Add nodes
- Exit the container
- Commit `data/flows.json`, `data/settings.js` and `data/nodes/`