# Development

This integration focuses on [Esper](https://www.esper.io/) and is using
[Esper API](https://api.esper.io/) for interacting with the Esper resources.

## Provider account setup

### In Esper

[Generate a REST API key](https://console-docs.esper.io/api/generate.html#how-to-generate-an-api-key-from-the-console)

1. On the dashboard, go to 'API Key Management'
2. Click the 'Create Key' button
3. Enter an API key name, description is optional.
4. Click the 'Create Key' button
5. Take note of the generated API key

## Authentication

Provide the `DOMAIN`, `ACCESS_TOKEN`, and the `ENTERPRISE_ID` to the `.env`. You
can use [`.env.example`](../.env.example) as a reference.

The API Key will be used to authorize requests using Basic Authorization.
