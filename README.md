# Metadata Collector: A Web Tool for Standardized Sequencing Metadata in Multi-centre Sequencing Projects

Metadata Collector is an open-source web platform for standardized, validated, and collaborative metadata management in next-generation sequencing (NGS) projects. It was developed to support multi-institutional research consortia in collecting consistent, FAIR-aligned metadata across heterogeneous sequencing studies.

The platform provides structured metadata templates, controlled vocabularies, real-time validation, and event-based versioning to improve metadata quality at the point of entry and reduce late-stage curation before downstream analysis or repository submission. 
  
More detailed information on the platform’s resources and real‑world deployment is available in our preprint (to put link).

## Key Features

*   **Customizable Metadata Templates:** Configure assay- or project-specific metadata schemas with mandatory and optional fields
*   **Dual-Layer Real-Time Validation:** Detect missing fields, invalid entries, and terminology inconsistencies during metadata entry.
*   **Event-Based Versioning:** Record metadata changes as timestamped events to support provenance, auditability, and reconstruction of previous states.
*   **Controlled vocabularies:** Use standardized dropdown fields to harmonize terminology across projects and research groups.
*   **Collaborative project workspaces:** Enable multiple contributors to annotate, review, and manage metadata within shared projects.
*   **Role-based access control:** Restrict project visibility and editing rights according to user roles and permissions.
*   **Interoperable Multi-Format Export:** Directly outputs clean, repository-compliant datasets into standard **CSV** and **ISA-Tab** profiles.
*   **Flexible deployment:** Deploy locally using Docker Compose or in production environments using Kubernetes.


## Software requirements
...

## Development status

This project is intended for experimentation, testing, and feedback at this stage.

## System Architecture
Metadata Collector implements a decoupled client-server architecture built to minimize infrastructure overhead and system latency (<50 ms response times under normal load):

*   **Frontend Client:** Single-Page Application (SPA) designed with **React**.
*   **Backend Server Layer:** Asynchronous RESTful API engine powered by **Node.js**.
*   **Persistent Storage Model:** **PostgreSQL** relational engine tracking two distinct modules: an *Immutable Event Store* for tracking operations and a *Core Derived State* space optimized for blazing-fast queries.


## Metadata Model

Metadata Collector uses a flexible event-driven data model based on three core concepts:

* **Entities:** Main metadata objects, currently including Projects and Samples.
* **Properties:** Metadata fields associated with entities, such as organism, tissue type, sample type, disease group, or library strategy.
* **Events:** Immutable records of all user actions and metadata modifications, enabling full version history and provenance tracking.


## Properties

Every project and sample has associated properties for which users can set values.
The set of properties which can be set can be configured in `config/properties/`, which is a list of property objects:

```yaml
- key: bio_sample_id
  type: sample
  permission: read
  data:
    type: input
    name: Bio Sample ID
    description: Identifer should start with SAMN
    regex: ^SAMN[0-9]{1,10}$
    examples:
      valid:
        - SAMN22222222
      invalid:
        - 123

- key: case_control
  type: sample
  permission: read
  data:
    type: select
    name: Case or Control
    description: Part of the organism under study
    options:
      - case
      - control
      - both
      - none
    examples:
      valid:
        - case
        - control
      invalid:
        - 123
```

Each property must have a `key`, `name` (displayed to users), `description` (for help associated with this property). `visible` can have values `user` (visible to the users), `admin` (visible to the admin), `always` (visible in all cases). If `entity` is set to either `project` or `sample`, the property can only be added to the respective entity.

For input validation, there are several options:

- if `options` are given, valid input must only be one of the given options.
- if `regex` is given, all input must match the regex.

Test cases that are checked when reading the file during runtime can be given as `valid` and `invalid`, where the values are taken as input and validation must return `true` and `false`, respectively.

## Development

You will need a recent version of _nodejs_.

Install the dependecies for the server and client by samplening

```sh
cd seq-meta-data
npm install
cd client
npm install
```

Start the api server

```sh
cd seq-meta-data
npm start
```

and start the development client server

```sh
cd seq-meta-data/client
npm start
```

This will enable hot reloading for client and server changes.

The default url for the server is
http://localhost:8088, please keep the port and use "localhost" instead of "0.0.0.0".
This is required for the auth server user login.

## API

all endpoints prefixed by `/api/v1/`.

All examples are sent with `Content-Type: application/json`, the api will always return `json`.

### Project

The top-level structure. Each project may contain samples. Both project and samples are "entities".

Setting permissions to `null` revokes access to the entity.

Note that these ACLs are only in addition to the owner (the user who created the entity) and to admins (they also may change everything).

## DB schema

### `enum entity_type`

- `none`
- `project`
- `sample`
- `both`

### `enum user_permission`

- `admin` (only visible to admins)
- `owner`
- `read` (only readable by users, editable by admins)
- `write` (editable by users)
- `none`

### Table `entities`

```sql
CREATE TABLE entities (
    id              BIGSERIAL           PRIMARY KEY NOT NULL,
    mnemonic        text                NOT NULL UNIQUE,
    type            entity_type         NOT NULL,
    parent          INTEGER             REFERENCES entities(id),
    owner           text                NOT NULL,
    created         timestamptz         NOT NULL,
    edited          timestamptz         NOT NULL,
    deleted         timestamptz
);
```

### Table `properties`

```sql
CREATE TABLE properties (
    id         BIGSERIAL       PRIMARY KEY NOT NULL,
    type       entity_type     NOT NULL,
    key        text            NOT NULL UNIQUE,
    permission user_permission NOT NULL,
    entity     BIGINT          REFERENCES entities(id),
    data       JSON            NOT NULL
);
```

### Table `events`

```sql
CREATE TABLE events (
    id               BIGSERIAL    PRIMARY KEY NOT NULL,
    entity           BIGINT       NOT NULL REFERENCES entities(id),
    property         BIGINT       NOT NULL REFERENCES properties(id),
    value            text         ,
    owner            text         ,
    timestamp        timestamptz  NOT NULL
);
```

### Table `entity_members`

```sql
CREATE TABLE entity_members (
    id         BIGSERIAL       PRIMARY KEY NOT NULL,
    entity     BIGINT          NOT NULL REFERENCES entities(id),
    sub        text            NOT NULL,
    permission user_permission NOT NULL,
    UNIQUE (entity, sub)
);

```

### Table `entity_columns`

```sql
CREATE TABLE entity_columns (
    id         BIGSERIAL       PRIMARY KEY NOT NULL,
    entity     BIGINT          NOT NULL REFERENCES entities(id),
    property   BIGINT          NOT NULL REFERENCES properties(id),
    sortindex  BIGINT          NOT NULL
);

```
