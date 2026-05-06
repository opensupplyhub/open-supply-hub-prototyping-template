# Open Supply Hub Data Model

This document describes the core database tables (entities) and their relationships relevant to prototyping, derived from the OS Hub entity-relationship diagram.

> **Note:** Infrastructure tables (authentication, sessions, payments, rate limiting, feature flags, audit history, etc.) are omitted from this document. Only domain-relevant tables are included.

---

## Table of Contents

- [Core Domain Tables](#core-domain-tables)
  - [api_contributor](#api_contributor)
  - [api_facility](#api_facility)
  - [api_facilitylist](#api_facilitylist)
  - [api_facilitylistitem](#api_facilitylistitem)
  - [api_source](#api_source)
  - [api_facilitymatch](#api_facilitymatch)
  - [api_facilityclaim](#api_facilityclaim)
- [Facility Detail Tables](#facility-detail-tables)
  - [api_facilityalias](#api_facilityalias)
  - [api_facilityfield](#api_facilityfield)
  - [api_facilitylocation](#api_facilitylocation)
  - [api_facilityactivityreport](#api_facilityactivityreport)
  - [api_facilityindex](#api_facilityindex)
  - [api_extendedfield](#api_extendedfield)
- [Facility Claim Detail Tables](#facility-claim-detail-tables)
  - [api_facilityclaimattachments](#api_facilityclaimattachments)
  - [api_facilityclaimreviewnote](#api_facilityclaimreviewnote)
- [Facility List Item Detail Tables](#facility-list-item-detail-tables)
  - [api_facilitylistitemfield](#api_facilitylistitemfield)
  - [api_facilitylistitemtemp](#api_facilitylistitemtemp)
  - [api_facilitymatchtemp](#api_facilitymatchtemp)
- [Embed Configuration Tables](#embed-configuration-tables)
  - [api_embedconfig](#api_embedconfig)
  - [api_embedfield](#api_embedfield)
- [Partner Field Tables](#partner-field-tables)
  - [api_partnerfield](#api_partnerfield)
  - [api_partnerfieldgroup](#api_partnerfieldgroup)
  - [api_contributor_partner_fields](#api_contributor_partner_fields)
- [Sector & Product Taxonomy](#sector--product-taxonomy)
  - [api_sector](#api_sector)
  - [api_sectorgroup](#api_sectorgroup)
  - [api_sector_groups](#api_sector_groups)
  - [api_producttype](#api_producttype)
  - [api_productiontype](#api_productiontype)
- [Moderation](#moderation)
  - [api_moderationevent](#api_moderationevent)
  - [api_event](#api_event)
- [Reference & Config Tables](#reference--config-tables)
  - [api_version](#api_version)
  - [api_wageindicatorcountrydata](#api_wageindicatorcountrydata)
  - [api_wageindicatorlinktextconfig](#api_wageindicatorlinktextconfig)

---

## Core Domain Tables

### api_contributor

An organization or individual that contributes facility data to the platform.

| Field                | Notes                          |
| -------------------- | ------------------------------ |
| id                   | Primary key                    |
| name                 |                                |
| description          |                                |
| website              |                                |
| contrib_type         | Type of contributor            |
| other_contrib_type   | Free-text when type is "Other" |
| created_at           |                                |
| updated_at           |                                |
| admin_id             | FK -> **api_user**             |
| is_verified          |                                |
| verification_notes   |                                |
| embed_config_id      | FK -> **api_embedconfig**      |
| embed_level          |                                |
| match_responsibility |                                |
| uuid                 |                                |

**Relationships:**

- `admin_id` -> `api_user` (the user who administers this contributor)
- `embed_config_id` -> `api_embedconfig` (optional embedded map configuration)

---

### api_facility

A production facility (factory, farm, etc.) tracked on the platform.

| Field                   | Notes                          |
| ----------------------- | ------------------------------ |
| id                      | Primary key (OS ID)            |
| name                    |                                |
| address                 |                                |
| country_code            |                                |
| location                | Geographic point (PostGIS)     |
| created_at              |                                |
| updated_at              |                                |
| created_from_id         | FK -> **api_facilitylistitem** |
| is_closed               |                                |
| new_os_id               | Replacement ID if merged       |
| has_inexact_coordinates |                                |
| uuid                    |                                |

**Relationships:**

- `created_from_id` -> `api_facilitylistitem` (the list item that first created this facility)

---

### api_facilitylist

A list (file upload) of facilities submitted by a contributor.

| Field                | Notes                                         |
| -------------------- | --------------------------------------------- |
| id                   | Primary key                                   |
| name                 |                                               |
| description          |                                               |
| file_name            |                                               |
| header               | Parsed CSV header                             |
| created_at           |                                               |
| updated_at           |                                               |
| replaces_id          | FK -> **api_facilitylist** (self-referential) |
| status               |                                               |
| status_change_by_id  | FK -> **api_user**                            |
| status_change_reason |                                               |
| match_responsibility |                                               |
| file                 | Uploaded file                                 |
| parsing_errors       |                                               |
| uuid                 |                                               |

**Relationships:**

- `replaces_id` -> `api_facilitylist` (previous version of this list)
- `status_change_by_id` -> `api_user`

---

### api_facilitylistitem

A single row from a facility list, representing one facility entry before or after processing.

| Field                   | Notes                         |
| ----------------------- | ----------------------------- |
| id                      | Primary key                   |
| row_index               | Position in the uploaded file |
| raw_data                | Original row data             |
| status                  | Processing status             |
| processing_started_at   |                               |
| processing_completed_at |                               |
| processing_results      |                               |
| name                    | Parsed facility name          |
| address                 | Parsed facility address       |
| country_code            |                               |
| geocoded_point          | PostGIS point from geocoding  |
| geocoded_address        |                               |
| created_at              |                               |
| updated_at              |                               |
| facility_id             | FK -> **api_facility**        |
| source_id               | FK -> **api_source**          |
| clean_address           | Cleaned/normalized address    |
| clean_name              | Cleaned/normalized name       |
| sector                  |                               |
| raw_header              |                               |
| raw_json                |                               |
| uuid                    |                               |
| moderation_event_id     | FK -> **api_moderationevent** |

**Relationships:**

- `facility_id` -> `api_facility` (the matched/created facility)
- `source_id` -> `api_source`
- `moderation_event_id` -> `api_moderationevent`

---

### api_source

Links a contributor to a facility list, representing the origin of contributed data.

| Field            | Notes                      |
| ---------------- | -------------------------- |
| id               | Primary key                |
| source_type      |                            |
| is_active        |                            |
| is_public        |                            |
| create           |                            |
| created_at       |                            |
| updated_at       |                            |
| contributor_id   | FK -> **api_contributor**  |
| facility_list_id | FK -> **api_facilitylist** |
| uuid             |                            |

**Relationships:**

- `contributor_id` -> `api_contributor`
- `facility_list_id` -> `api_facilitylist`

---

### api_facilitymatch

Records the result of matching a facility list item to an existing facility.

| Field                 | Notes                                      |
| --------------------- | ------------------------------------------ |
| id                    | Primary key                                |
| results               | Match algorithm output                     |
| confidence            | Match confidence score                     |
| status                | PENDING / AUTOMATIC / CONFIRMED / REJECTED |
| created_at            |                                            |
| updated_at            |                                            |
| facility_id           | FK -> **api_facility**                     |
| facility_list_item_id | FK -> **api_facilitylistitem**             |
| is_active             |                                            |
| uuid                  |                                            |

**Relationships:**

- `facility_id` -> `api_facility`
- `facility_list_item_id` -> `api_facilitylistitem`

---

### api_facilityclaim

A claim by a contributor that they own or operate a facility. Contains extensive facility detail fields.

| Field                                   | Notes                     |
| --------------------------------------- | ------------------------- |
| id                                      | Primary key               |
| contact_person                          |                           |
| company_name                            |                           |
| website                                 |                           |
| facility_description                    |                           |
| status                                  | Claim review status       |
| created_at                              |                           |
| updated_at                              |                           |
| contributor_id                          | FK -> **api_contributor** |
| facility_id                             | FK -> **api_facility**    |
| status_change_date                      |                           |
| status_change_by_id                     | FK -> **api_contributor** |
| status_change_reason                    |                           |
| facility_address                        |                           |
| facility_average_lead_time              |                           |
| facility_minimum_order_quantity         |                           |
| facility_phone_number                   |                           |
| facility_phone_number_publicly_visible  |                           |
| facility_website                        |                           |
| office_address                          |                           |
| office_country_code                     |                           |
| office_info_publicly_visible            |                           |
| office_official_name                    |                           |
| office_phone_number                     |                           |
| point_of_contact_email                  |                           |
| point_of_contact_person_name            |                           |
| point_of_contact_publicly_visible       |                           |
| parent_company_id                       | FK -> **api_contributor** |
| facility_female_workers_percentage      |                           |
| facility_name_english                   |                           |
| facility_name_native_language           |                           |
| facility_type                           |                           |
| facility_website_publicly_visible       |                           |
| job_title                               |                           |
| linkedin_profile                        |                           |
| other_facility_type                     |                           |
| facility_affiliations                   |                           |
| facility_certifications                 |                           |
| facility_product_types                  |                           |
| facility_production_types               |                           |
| sector                                  |                           |
| parent_company_name                     |                           |
| facility_location                       |                           |
| facility_workers_count                  |                           |
| uuid                                    |                           |
| closing_date                            |                           |
| energy_animal_waste                     |                           |
| energy_biomass                          |                           |
| energy_charcoal                         |                           |
| energy_coal                             |                           |
| energy_diesel                           |                           |
| energy_electricity                      |                           |
| energy_kerosene                         |                           |
| energy_natural_gas                      |                           |
| energy_other                            |                           |
| estimated_annual_throughput             |                           |
| opening_date                            |                           |
| claimant_employment_verification_method |                           |
| claimant_linkedin_profile_url           |                           |
| claimant_location_relationship          |                           |
| location_address_verification_method    |                           |

**Relationships:**

- `contributor_id` -> `api_contributor`
- `facility_id` -> `api_facility`
- `status_change_by_id` -> `api_contributor`
- `parent_company_id` -> `api_contributor`

---

## Facility Detail Tables

### api_facilityalias

Alternative OS IDs for a facility (e.g. after merges).

| Field       | Notes                     |
| ----------- | ------------------------- |
| os_id       | Primary key               |
| reason      | Why the alias was created |
| created_at  |                           |
| updated_at  |                           |
| facility_id | FK -> **api_facility**    |
| uuid        |                           |

**Relationships:**

- `facility_id` -> `api_facility`

---

### api_facilityfield

Key-value metadata fields attached to a facility.

| Field       | Notes                  |
| ----------- | ---------------------- |
| id          | Primary key            |
| key         |                        |
| value       |                        |
| type        |                        |
| updated_at  |                        |
| created_at  |                        |
| facility_id | FK -> **api_facility** |

**Relationships:**

- `facility_id` -> `api_facility`

---

### api_facilitylocation

Records of geographic coordinates contributed for a facility.

| Field          | Notes                     |
| -------------- | ------------------------- |
| id             | Primary key               |
| location       | PostGIS point             |
| notes          |                           |
| created_at     |                           |
| updated_at     |                           |
| contributor_id | FK -> **api_contributor** |
| created_by_id  | FK -> **api_user**        |
| facility_id    | FK -> **api_facility**    |
| uuid           |                           |

**Relationships:**

- `contributor_id` -> `api_contributor`
- `created_by_id` -> `api_user`
- `facility_id` -> `api_facility`

---

### api_facilityactivityreport

Reports of facility activity changes (e.g. closures).

| Field                      | Notes                     |
| -------------------------- | ------------------------- |
| id                         | Primary key               |
| reason_for_report          |                           |
| closure_state              |                           |
| approved_at                |                           |
| status                     |                           |
| status_change_reason       |                           |
| status_change_date         |                           |
| created_at                 |                           |
| updated_at                 |                           |
| facility_id                | FK -> **api_facility**    |
| reported_by_contributor_id | FK -> **api_contributor** |
| reported_by_user_id        | FK -> **api_user**        |
| status_change_by_id        | FK -> **api_user**        |
| uuid                       |                           |

**Relationships:**

- `facility_id` -> `api_facility`
- `reported_by_contributor_id` -> `api_contributor`
- `reported_by_user_id` -> `api_user`
- `status_change_by_id` -> `api_user`

---

### api_facilityindex

Denormalized/search-optimized index of facility data for fast querying.

| Field                   | Notes       |
| ----------------------- | ----------- |
| id                      | Primary key |
| name                    |             |
| address                 |             |
| country_code            |             |
| location                |             |
| contributors_count      |             |
| contributors_id         |             |
| approved_claim_ids      |             |
| is_closed               |             |
| new_os_id               |             |
| has_inexact_coordinates |             |
| contrib_types           |             |
| contributors            |             |
| sector                  |             |
| lists                   |             |
| custom_text             |             |
| number_of_workers       |             |
| facility_type           |             |
| processing_type         |             |
| product_type            |             |
| parent_company_name     |             |
| native_language_name    |             |
| parent_company_id       |             |
| facility_names          |             |
| facility_list_items     |             |
| facility_locations      |             |
| approved_claim          |             |
| facility_addresses      |             |
| claim_info              |             |
| custom_field_info       |             |
| extended_fields         |             |
| created_from_info       |             |
| activity_reports_info   |             |
| item_sectors            |             |
| claim_sectors           |             |
| created_at              |             |
| updated_at              |             |
| custom_text_search      |             |
| uuid                    |             |

**Relationships:** Standalone denormalized table; no direct foreign keys.

---

### api_extendedfield

Flexible additional data fields attached to facilities, claims, or list items by contributors.

| Field                 | Notes                          |
| --------------------- | ------------------------------ |
| id                    | Primary key                    |
| is_verified           |                                |
| field_name            |                                |
| value                 |                                |
| created_at            |                                |
| updated_at            |                                |
| contributor_id        | FK -> **api_contributor**      |
| facility_id           | FK -> **api_facility**         |
| facility_claim_id     | FK -> **api_facilityclaim**    |
| facility_list_item_id | FK -> **api_facilitylistitem** |
| uuid                  |                                |

**Relationships:**

- `contributor_id` -> `api_contributor`
- `facility_id` -> `api_facility`
- `facility_claim_id` -> `api_facilityclaim`
- `facility_list_item_id` -> `api_facilitylistitem`

---

## Facility Claim Detail Tables

### api_facilityclaimattachments

File attachments uploaded with a facility claim.

| Field            | Notes                       |
| ---------------- | --------------------------- |
| id               | Primary key                 |
| file_name        |                             |
| claim_attachment | File field                  |
| uploaded_at      |                             |
| claim_id         | FK -> **api_facilityclaim** |

**Relationships:**

- `claim_id` -> `api_facilityclaim`

---

### api_facilityclaimreviewnote

Internal review notes on a facility claim.

| Field      | Notes                       |
| ---------- | --------------------------- |
| id         | Primary key                 |
| note       |                             |
| created_at |                             |
| updated_at |                             |
| author_id  | FK -> **api_user**          |
| claim_id   | FK -> **api_facilityclaim** |

**Relationships:**

- `author_id` -> `api_user`
- `claim_id` -> `api_facilityclaim`

---

## Facility List Item Detail Tables

### api_facilitylistitemfield

Key-value metadata fields attached to a facility list item.

| Field                 | Notes                          |
| --------------------- | ------------------------------ |
| id                    | Primary key                    |
| key                   |                                |
| value                 |                                |
| type                  |                                |
| updated_at            |                                |
| created_at            |                                |
| facility_list_item_id | FK -> **api_facilitylistitem** |

**Relationships:**

- `facility_list_item_id` -> `api_facilitylistitem`

---

### api_facilitylistitemtemp

Temporary/staging copy of facility list items used during reprocessing.

| Field                   | Notes       |
| ----------------------- | ----------- |
| id                      | Primary key |
| facility_id             |             |
| source_id               |             |
| row_index               |             |
| raw_data                |             |
| status                  |             |
| processing_started_at   |             |
| processing_completed_at |             |
| processing_results      |             |
| name                    |             |
| address                 |             |
| country_code            |             |
| sector                  |             |
| geocoded_point          |             |
| geocoded_address        |             |
| clean_name              |             |
| clean_address           |             |
| version                 |             |
| created_at              |             |
| updated_at              |             |

**Relationships:**

- `source_id` -> `api_source`

---

### api_facilitymatchtemp

Temporary/staging copy of facility matches used during reprocessing.

| Field                 | Notes       |
| --------------------- | ----------- |
| id                    | Primary key |
| facility_id           |             |
| facility_list_item_id |             |
| results               |             |
| confidence            |             |
| status                |             |
| is_active             |             |
| version               |             |
| created_at            |             |
| updated_at            |             |

**Relationships:**

- References `api_facilitylistitemtemp` (via facility_list_item_id)

---

## Embed Configuration Tables

### api_embedconfig

Configuration for embedded map widgets used by contributors.

| Field                   | Notes       |
| ----------------------- | ----------- |
| id                      | Primary key |
| width                   |             |
| height                  |             |
| color                   |             |
| font                    |             |
| created_at              |             |
| updated_at              |             |
| prefer_contributor_name |             |
| text_search_label       |             |
| map_style               |             |
| hide_sector_data        |             |

**Relationships:** Referenced by `api_contributor.embed_config_id` and `api_embedfield.embed_config_id`.

---

### api_embedfield

Configures which data fields are visible/searchable in an embedded map widget.

| Field           | Notes                     |
| --------------- | ------------------------- |
| id              | Primary key               |
| column_name     |                           |
| display_name    |                           |
| visible         |                           |
| order           |                           |
| created_at      |                           |
| updated_at      |                           |
| embed_config_id | FK -> **api_embedconfig** |
| searchable      |                           |

**Relationships:**

- `embed_config_id` -> `api_embedconfig`

---

## Partner Field Tables

### api_partnerfield

Defines custom data fields contributed by partner organizations.

| Field        | Notes                           |
| ------------ | ------------------------------- |
| name         |                                 |
| uuid         | Primary key                     |
| type         |                                 |
| created_at   |                                 |
| updated_at   |                                 |
| unit         |                                 |
| label        |                                 |
| source_by    |                                 |
| json_schema  |                                 |
| base_url     |                                 |
| display_text |                                 |
| active       |                                 |
| system_field |                                 |
| group_id     | FK -> **api_partnerfieldgroup** |

**Relationships:**

- `group_id` -> `api_partnerfieldgroup`

---

### api_partnerfieldgroup

Groups partner fields into categories for display.

| Field       | Notes         |
| ----------- | ------------- |
| uuid        | Primary key   |
| name        |               |
| order       | Display order |
| icon_file   |               |
| description |               |
| helper_text |               |
| created_at  |               |
| updated_at  |               |

**Relationships:** Referenced by `api_partnerfield.group_id`.

---

### api_contributor_partner_fields

Join table linking contributors to the partner fields they use.

| Field           | Notes                      |
| --------------- | -------------------------- |
| id              | Primary key                |
| contributor_id  | FK -> **api_contributor**  |
| partnerfield_id | FK -> **api_partnerfield** |

**Relationships:**

- `contributor_id` -> `api_contributor`
- `partnerfield_id` -> `api_partnerfield`

---

## Sector & Product Taxonomy

### api_sector

A supply chain sector (e.g. Apparel, Agriculture).

| Field | Notes       |
| ----- | ----------- |
| name  | Primary key |

---

### api_sectorgroup

A grouping of related sectors.

| Field | Notes       |
| ----- | ----------- |
| id    | Primary key |
| name  |             |

---

### api_sector_groups

Join table linking sectors to sector groups.

| Field          | Notes                     |
| -------------- | ------------------------- |
| id             | Primary key               |
| sector_id      | FK -> **api_sector**      |
| sectorgroup_id | FK -> **api_sectorgroup** |

**Relationships:**

- `sector_id` -> `api_sector`
- `sectorgroup_id` -> `api_sectorgroup`

---

### api_producttype

Lookup table of product types.

| Field | Notes       |
| ----- | ----------- |
| value | Primary key |

---

### api_productiontype

Lookup table of production/processing types.

| Field | Notes       |
| ----- | ----------- |
| value | Primary key |

---

## Moderation

### api_moderationevent

Tracks moderation actions on facility data (approvals, rejections, etc.).

| Field                      | Notes                       |
| -------------------------- | --------------------------- |
| uuid                       | Primary key                 |
| created_at                 |                             |
| updated_at                 |                             |
| status_change_date         |                             |
| request_type               |                             |
| raw_data                   |                             |
| cleaned_data               |                             |
| geocode_result             |                             |
| status                     |                             |
| source                     |                             |
| claim_id                   | FK -> **api_facilityclaim** |
| contributor_id             | FK -> **api_contributor**   |
| os_id                      | FK -> **api_facility**      |
| action_type                |                             |
| action_perform_by_id       | FK -> **api_user**          |
| action_reason_text_cleaned |                             |
| action_reason_text_raw     |                             |
| backfilled_fields          |                             |

**Relationships:**

- `claim_id` -> `api_facilityclaim`
- `contributor_id` -> `api_contributor`
- `os_id` -> `api_facility`
- `action_perform_by_id` -> `api_user`

---

### api_event

Generic event log.

| Field         | Notes                    |
| ------------- | ------------------------ |
| id            | Primary key              |
| object_id     | ID of the related object |
| event_type    |                          |
| event_time    |                          |
| event_details |                          |
| created_at    |                          |
| updated_at    |                          |

---

## Reference & Config Tables

### api_version

Tracks API or application versions.

| Field      | Notes |
| ---------- | ----- |
| name       |       |
| version    |       |
| created_at |       |
| updated_at |       |

---

### api_wageindicatorcountrydata

Wage Indicator data links per country.

| Field                      | Notes       |
| -------------------------- | ----------- |
| country_code               | Primary key |
| living_wage_link_national  |             |
| minimum_wage_link_english  |             |
| minimum_wage_link_national |             |
| created_at                 |             |
| updated_at                 |             |

---

### api_wageindicatorlinktextconfig

Display text configuration for Wage Indicator links.

| Field        | Notes       |
| ------------ | ----------- |
| link_type    | Primary key |
| display_text |             |
| created_at   |             |
| updated_at   |             |
