# OS Hub API Documentation

> Sources:
>
> - Old API endpoints (Swagger): [opensupplyhub.org/api/docs/](https://opensupplyhub.org/api/docs/)
> - New v1 API documentation: [opensupplyhub.github.io/open-supply-hub-api-docs/](https://opensupplyhub.github.io/open-supply-hub-api-docs/)

## Overview

Open Supply Hub provides two sets of API endpoints:

### Legacy API Endpoints

The original API endpoints are documented via a Swagger/OpenAPI interface at:

**https://opensupplyhub.org/api/docs/**

These endpoints cover the existing facility search, contribution, and management workflows.

### New v1 API Endpoints

The new v1 API endpoints are documented at:

**https://opensupplyhub.github.io/open-supply-hub-api-docs/**

> **Note:** This is a draft version of the documentation. These APIs may not all be available for use yet.

The v1 API introduces the `production-locations` resource with an improved schema, better search capabilities, and support for additional identifiers (DUNS, LEI, RBA ID) and affiliations.

Key v1 endpoints include:

- `GET /v1/production-locations/` — Search and list production locations
- `GET /v1/production-locations/{os_id}/` — Get a specific production location by OS ID
- `POST /v1/production-locations/` — Create a new production location
- `PATCH /v1/production-locations/{os_id}/` — Update a production location

For the full schema of the production location object, see [data-schema-rfc-production-locations.md](./data-schema-rfc-production-locations.md).
